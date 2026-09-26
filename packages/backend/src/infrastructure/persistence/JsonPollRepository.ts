import fs from 'node:fs/promises';
import path from 'node:path';
import { IPollRepository } from '../../domain/ports/IPollRepository.js';
import { PollResult, PollCandidateShare, SecondRoundScenario } from '../../domain/entities/PollResult.js';
import { OfficeRole } from '../../domain/value-objects/OfficeRole.js';
import { getDataDir } from './dataPath.js';

function extractParty(name: string): string {
  const match = name.match(/\(([^)]+)\)/);
  if (match) {
    const raw = match[1].split('-')[0].trim();
    return raw;
  }
  return '';
}

function getCandidateColor(name: string): string {
  const upper = name.toUpperCase();
  if (upper.includes('LULA') || upper.includes('HADDAD') || upper.includes('PT')) return '#DC2626';
  if (upper.includes('BOLSONARO') || upper.includes('PL') || upper.includes('ANDRÉ DO PRADO')) return '#2563EB';
  if (upper.includes('TARCÍSIO') || upper.includes('REPUBLICANOS')) return '#1E40AF';
  if (upper.includes('DERRITE') || upper.includes('PP')) return '#3B82F6';
  if (upper.includes('ZEMA') || upper.includes('SALLES') || upper.includes('NOVO')) return '#F97316';
  if (upper.includes('CAIADO') || upper.includes('PSD')) return '#0D9488';
  if (upper.includes('RENAN') || upper.includes('SCHIAVETTO') || upper.includes('MISSÃO')) return '#EAB308';
  if (upper.includes('CURY') || upper.includes('AVANTE')) return '#8B5CF6';
  if (upper.includes('TEBET') || upper.includes('PSB')) return '#E11D48';
  if (upper.includes('MARINA') || upper.includes('REDE')) return '#059669';
  if (upper.includes('BRANCO') || upper.includes('NULO') || upper.includes('INDECISO')) return '#94A3B8';
  return '#64748B';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export class JsonPollRepository implements IPollRepository {
  private async readFileSafe<T>(filePath: string, fallback: T): Promise<T> {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data) as T;
    } catch {
      return fallback;
    }
  }

  private async writeFileSafe<T>(filePath: string, data: T): Promise<void> {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  private parseMarginOfError(marginStr: string | number): number {
    if (typeof marginStr === 'number') return marginStr;
    const clean = marginStr.replace('p.p.', '').replace(',', '.').trim();
    const parsed = parseFloat(clean);
    return isNaN(parsed) ? 2.0 : parsed;
  }

  async findAllByRole(role: OfficeRole): Promise<PollResult[]> {
    const mainPollFile = path.join(getDataDir(), 'polls', 'presidencial_2026.json');
    const rawData = await this.readFileSafe<any>(mainPollFile, null);

    if (!rawData) {
      return [];
    }

    // Role: PRESIDENTE
    if (role === OfficeRole.PRESIDENTE) {
      if (Array.isArray(rawData)) {
        return rawData;
      }

      if (rawData.presidentialPolls && Array.isArray(rawData.presidentialPolls)) {
        return rawData.presidentialPolls.map((poll: any, idx: number) => {
          const rawItems = poll.firstRoundTotal || poll.firstRoundValidVotes || [];
          
          let brancosNulos = 0;
          let indecisos = 0;

          const intencoes: PollCandidateShare[] = [];
          for (const item of rawItems) {
            const isBrancoIndeciso = /branco|nulo|indeciso/i.test(item.candidate);
            if (isBrancoIndeciso) {
              brancosNulos = item.percentage;
            } else {
              intencoes.push({
                candidateId: slugify(item.candidate),
                candidateName: item.candidate,
                partySigla: extractParty(item.candidate),
                percentage: item.percentage,
                color: getCandidateColor(item.candidate),
                isBaseline: Boolean(item.isBaseline),
              });
            }
          }

          return {
            id: `pres-poll-${idx + 1}`,
            cargo: OfficeRole.PRESIDENTE,
            cenario: poll.firstRoundValidVotes ? 'Votos Válidos - 1º Turno (Agregador 8 Institutos)' : 'Estimulada - 1º Turno (Cenário Geral)',
            instituto: poll.institute,
            numeroRegistroTSE: poll.tseRegistration,
            dataColetaInicio: poll.fieldPeriod || 'Setembro/2026',
            dataColetaFim: poll.fieldPeriod || 'Setembro/2026',
            dataHoraDivulgacao: '2026-09-23T11:06:00.000Z',
            publishedAtText: poll.publishedAt,
            margemErro: this.parseMarginOfError(poll.marginOfError),
            marginOfErrorText: poll.marginOfError,
            nivelConfianca: parseInt(poll.confidenceLevel, 10) || 95,
            tamanhoAmostra: poll.sampleSize,
            fontesAuditaveis: poll.sourceUrl || 'TSE / Instituto Oficial',
            votosValidos: Boolean(poll.firstRoundValidVotes),
            intencoes,
            brancosNulos,
            indecisos,
            secondRoundRunoff: poll.secondRoundRunoff as SecondRoundScenario[] | undefined,
            fieldPeriod: poll.fieldPeriod,
          };
        });
      }
    }

    // Role: GOVERNADOR_SP
    if (role === OfficeRole.GOVERNADOR_SP) {
      if (rawData.saoPauloPolls?.governor) {
        const gov = rawData.saoPauloPolls.governor;
        const results = gov.results || [];

        let brancosNulos = 0;
        const intencoes: PollCandidateShare[] = [];

        for (const item of results) {
          if (/branco|nulo|indeciso/i.test(item.candidate)) {
            brancosNulos = item.percentage;
          } else {
            const isBaseline = item.candidate.includes('[Referencial]') || item.candidate.includes('Haddad');
            intencoes.push({
              candidateId: slugify(item.candidate),
              candidateName: item.candidate.replace(/\[Referencial\]/g, '').trim(),
              partySigla: extractParty(item.candidate),
              percentage: item.percentage,
              color: getCandidateColor(item.candidate),
              isBaseline,
            });
          }
        }

        return [
          {
            id: 'poll-gov-sp-vox-2026',
            cargo: OfficeRole.GOVERNADOR_SP,
            cenario: '1º Turno Estimulado - Governo de São Paulo',
            instituto: gov.institute,
            numeroRegistroTSE: gov.tseRegistration,
            dataColetaInicio: '20/09/2026',
            dataColetaFim: '22/09/2026',
            dataHoraDivulgacao: '2026-09-25T07:00:00.000Z',
            publishedAtText: gov.publishedAt,
            margemErro: this.parseMarginOfError(gov.marginOfError),
            marginOfErrorText: gov.marginOfError,
            nivelConfianca: 95,
            tamanhoAmostra: gov.sampleSize,
            fontesAuditaveis: 'Pesquisa registrada no TRE-SP (Vox Brasil / Poder360)',
            votosValidos: false,
            intencoes,
            brancosNulos,
            indecisos: 0,
            fieldPeriod: gov.fieldPeriod,
          },
        ];
      }
    }

    // Role: SENADOR_SP
    if (role === OfficeRole.SENADOR_SP) {
      if (rawData.saoPauloPolls?.senate) {
        const sen = rawData.saoPauloPolls.senate;
        const results = sen.results || [];

        const intencoes: PollCandidateShare[] = results.map((item: any) => {
          const isBaseline = item.candidate.includes('[Referencial]') || item.spectrum?.includes('Haddad');
          return {
            candidateId: slugify(item.candidate),
            candidateName: item.candidate.replace(/\[Referencial\]/g, '').trim(),
            partySigla: extractParty(item.candidate),
            percentage: item.realTimePercent || item.quaestPercent || 0,
            realTimePercent: item.realTimePercent,
            quaestPercent: item.quaestPercent,
            spectrum: item.spectrum,
            color: getCandidateColor(item.candidate),
            isBaseline,
          };
        });

        return [
          {
            id: 'poll-sen-sp-realtime-quaest-2026',
            cargo: OfficeRole.SENADOR_SP,
            cenario: 'Disputa pelas 2 Vagas ao Senado por SP (Real Time Big Data vs Quaest)',
            instituto: sen.institute,
            numeroRegistroTSE: 'SP-07495/2026 e SP-02456/2026',
            dataColetaInicio: '21/09/2026',
            dataColetaFim: '23/09/2026',
            dataHoraDivulgacao: '2026-09-23T15:00:00.000Z',
            publishedAtText: sen.publishedAt,
            margemErro: this.parseMarginOfError(sen.marginOfError),
            marginOfErrorText: sen.marginOfError,
            nivelConfianca: 95,
            tamanhoAmostra: 3480,
            fontesAuditaveis: 'Pesquisas registradas no TRE-SP (Real Time Big Data e Quaest)',
            votosValidos: false,
            intencoes,
            brancosNulos: 12.0,
            indecisos: 6.0,
            isDualComparison: true,
          },
        ];
      }
    }

    return [];
  }

  async findLatestByRole(role: OfficeRole): Promise<PollResult | null> {
    const polls = await this.findAllByRole(role);
    if (polls.length === 0) return null;
    return polls[0];
  }

  async findAll(): Promise<PollResult[]> {
    const roles = [OfficeRole.PRESIDENTE, OfficeRole.GOVERNADOR_SP, OfficeRole.SENADOR_SP];
    const results = await Promise.all(roles.map(r => this.findAllByRole(r)));
    return results.flat();
  }

  async save(poll: PollResult): Promise<void> {
    // Stub save if needed
  }
}
