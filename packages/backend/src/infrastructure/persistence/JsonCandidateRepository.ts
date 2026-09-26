import fs from 'node:fs/promises';
import path from 'node:path';
import { ICandidateRepository } from '../../domain/ports/ICandidateRepository.js';
import { Candidate } from '../../domain/entities/Candidate.js';
import { OfficeRole } from '../../domain/value-objects/OfficeRole.js';
import { LegalStatus } from '../../domain/value-objects/LegalStatus.js';
import { ThematicPillar, CandidatePillarsProfile } from '../../domain/value-objects/ThematicPillar.js';
import { PoliticalParty } from '../../domain/entities/PoliticalParty.js';
import { LegislativeVote } from '../../domain/entities/LegislativeVote.js';
import { LegalRecord } from '../../domain/entities/LegalRecord.js';
import { getDataDir } from './dataPath.js';

function getPartyColor(sigla: string): string {
  switch (sigla.toUpperCase()) {
    case 'PL': return '#2563EB';
    case 'NOVO': return '#F97316';
    case 'PSD': return '#0D9488';
    case 'MISSÃO': return '#EAB308';
    case 'PT': return '#DC2626';
    case 'REPUBLICANOS': return '#1E40AF';
    case 'PSOL': return '#DC2626';
    default: return '#64748B';
  }
}

function getEspectro(sigla: string): 'Direita' | 'Centro-Direita' | 'Centro' | 'Centro-Esquerda' | 'Esquerda' {
  switch (sigla.toUpperCase()) {
    case 'PL': return 'Direita';
    case 'NOVO': return 'Direita';
    case 'PSD': return 'Centro-Direita';
    case 'MISSÃO': return 'Centro-Direita';
    case 'PT': return 'Esquerda';
    case 'REPUBLICANOS': return 'Direita';
    case 'PSOL': return 'Esquerda';
    default: return 'Centro';
  }
}

function normalizeCandidate(raw: any, defaultRole: OfficeRole): Candidate {
  const id = raw.id || '';
  const name = raw.name || raw.nomeUrna || raw.nomeCompleto || id;
  const nomeUrna = raw.nomeUrna || raw.name || id;
  const nomeCompleto = raw.nomeCompleto || raw.name || id;
  const ballotNumber = raw.ballotNumber ? String(raw.ballotNumber) : (raw.numeroUrna ? String(raw.numeroUrna) : '0');
  const numeroUrna = typeof raw.numeroUrna === 'number' ? raw.numeroUrna : parseInt(ballotNumber, 10) || 0;
  const cargo = (raw.role || raw.cargo || defaultRole) as OfficeRole;
  const photoUrl = raw.photoUrl || raw.fotoUrl || '';
  const fotoUrl = photoUrl;
  const isBaseline = Boolean(raw.isBaseline || raw.isBaselineReference);
  const isBaselineReference = isBaseline;
  const coalition = raw.coalition || raw.coligacaoOuFederacao || '';
  const coligacaoOuFederacao = coalition;

  const partySigla = typeof raw.party === 'string' ? raw.party : (raw.partido?.sigla || '');
  const partido: PoliticalParty = (typeof raw.partido === 'object' && raw.partido.sigla) ? raw.partido : {
    id: partySigla.toLowerCase(),
    sigla: partySigla,
    numero: numeroUrna,
    nome: partySigla,
    espectro: getEspectro(partySigla),
    corHex: getPartyColor(partySigla),
  };

  // Termômetro de Alinhamento
  const defaultAlignments: Record<string, any> = {
    'flavio-bolsonaro': { lib: 78, est: 72, cons: 94, seg: 96, score: 85, desc: 'Direita Conservadora' },
    'romeu-zema': { lib: 96, est: 98, cons: 70, seg: 86, score: 88, desc: 'Direita Liberal / Austera' },
    'ronaldo-caiado': { lib: 82, est: 80, cons: 88, seg: 99, score: 87, desc: 'Direita Agro / Segurança Forte' },
    'renan-santos': { lib: 88, est: 85, cons: 72, seg: 92, score: 84, desc: 'Direita Liberal Republicana' },
    'lula': { lib: 32, est: 20, cons: 18, seg: 35, score: 26, desc: 'Esquerda Desenvolvimentista' },
    'tarcisio-de-freitas': { lib: 92, est: 90, cons: 78, seg: 92, score: 88, desc: 'Direita Técnica / Pragmática' },
    'fernando-haddad': { lib: 34, est: 22, cons: 20, seg: 38, score: 28, desc: 'Esquerda Desenvolvimentista' },
    'guilherme-derrite': { lib: 84, est: 82, cons: 95, seg: 99, score: 90, desc: 'Direita Conservadora / ROTA' },
    'ricardo-salles': { lib: 95, est: 96, cons: 82, seg: 90, score: 91, desc: 'Direita Liberal Combativa' },
    'andre-do-prado': { lib: 82, est: 84, cons: 85, seg: 88, score: 85, desc: 'Centro-Direita Articulador' },
    'guto-schiavetto': { lib: 96, est: 98, cons: 75, seg: 96, score: 91, desc: 'Direita Liberal / MBL' },
    'marina-silva': { lib: 35, est: 30, cons: 25, seg: 35, score: 31, desc: 'Esquerda Socioambientalista' },
  };
  const defAlign = defaultAlignments[id] || { lib: 70, est: 70, cons: 70, seg: 70, score: 70, desc: 'Centro' };

  const termometroAlinhamento = raw.termometroAlinhamento || {
    liberdadeEconomica: defAlign.lib,
    estadoEnxuto: defAlign.est,
    conservadorismo: defAlign.cons,
    segurancaRigorosa: defAlign.seg,
    scoreGeral: defAlign.score,
    classificacao: defAlign.desc,
  };

  // Pilares
  const defaultScores: Record<string, Record<string, number>> = {
    'flavio-bolsonaro': { seg: 9.5, gas: 7.0, tam: 7.5, sau: 6.8, edu: 7.2 },
    'romeu-zema': { seg: 8.7, gas: 9.8, tam: 9.7, sau: 8.2, edu: 8.5 },
    'ronaldo-caiado': { seg: 9.9, gas: 8.0, tam: 8.1, sau: 8.4, edu: 9.2 },
    'renan-santos': { seg: 9.1, gas: 8.9, tam: 8.6, sau: 7.9, edu: 8.1 },
    'lula': { seg: 4.5, gas: 3.8, tam: 2.5, sau: 7.5, edu: 6.8 },
    'tarcisio-de-freitas': { seg: 9.4, gas: 8.9, tam: 9.6, sau: 8.3, edu: 8.5 },
    'fernando-haddad': { seg: 4.2, gas: 4.0, tam: 3.0, sau: 7.4, edu: 7.8 },
    'guilherme-derrite': { seg: 9.9, gas: 8.2, tam: 8.8, sau: 7.5, edu: 7.9 },
    'ricardo-salles': { seg: 9.2, gas: 9.5, tam: 9.8, sau: 7.5, edu: 7.8 },
    'andre-do-prado': { seg: 8.8, gas: 8.5, tam: 8.9, sau: 8.2, edu: 8.4 },
    'guto-schiavetto': { seg: 9.5, gas: 9.6, tam: 9.7, sau: 7.8, edu: 8.2 },
    'marina-silva': { seg: 4.0, gas: 4.2, tam: 3.5, sau: 7.0, edu: 7.5 },
  };
  const candScores = defaultScores[id] || { seg: 7.0, gas: 7.0, tam: 7.0, sau: 7.0, edu: 7.0 };

  const rawPillars = raw.pillars || {};

  function parsePillarEntry(entry: any, defaultScore: number) {
    if (!entry) {
      return { score: defaultScore, summary: 'Sem dados', keyProposals: [] };
    }
    if (typeof entry === 'string') {
      return { score: defaultScore, summary: entry, keyProposals: [entry] };
    }
    if (typeof entry === 'object') {
      const proposal = entry.proposal || '';
      const implementation = entry.implementation || '';
      const summary = proposal || implementation || 'Sem dados';
      const keyProposals: string[] = [];
      if (proposal) keyProposals.push(`Proposta: ${proposal}`);
      if (implementation) keyProposals.push(`Como implementar: ${implementation}`);
      return { score: defaultScore, summary, keyProposals };
    }
    return { score: defaultScore, summary: String(entry), keyProposals: [] };
  }

  const pilares: CandidatePillarsProfile = raw.pilares || {
    [ThematicPillar.SEGURANCA_PUBLICA]: parsePillarEntry(rawPillars.segurancaPublica, candScores.seg),
    [ThematicPillar.GASTOS_PUBLICOS]: parsePillarEntry(rawPillars.gastosPublicos, candScores.gas),
    [ThematicPillar.TAMANHO_DO_ESTADO]: parsePillarEntry(rawPillars.tamanhoDoEstado, candScores.tam),
    [ThematicPillar.SAUDE]: parsePillarEntry(rawPillars.saude, candScores.sau),
    [ThematicPillar.EDUCACAO]: parsePillarEntry(rawPillars.educacao, candScores.edu),
  };

  // Votações Legislativas
  const rawVotes = raw.legislativeVotes || [];
  const votacoesLegislativas: LegislativeVote[] = raw.votacoesLegislativas || rawVotes.map((v: any, idx: number) => {
    const isSim = /SIM|FAVOR|SANCIONADO/i.test(v.vote);
    const isNao = /NÃO|CONTRA/i.test(v.vote);
    return {
      id: `vote-${id}-${idx}`,
      projetoCodigo: v.code || '',
      tema: v.title || '',
      ementa: v.summary || '',
      data: '2023-2024',
      voto: isSim ? 'SIM' : isNao ? 'NAO' : 'ABSTENCAO',
      orientacaoBancada: v.vote || '',
      descricaoImpacto: v.summary || '',
      linkOficial: 'https://legis.senado.leg.br',
    };
  });

  // Ficha Jurídica
  const rawLegal = raw.legalRecords || [];
  const fichaJuridica: LegalRecord[] = raw.fichaJuridica || rawLegal.map((rec: any, idx: number) => {
    const outcome = rec.legalOutcome || '';
    let status: LegalStatus = LegalStatus.EM_ANDAMENTO;
    if (/Absolvi/i.test(outcome) || /Sem Condenação/i.test(outcome) || /Aprovadas/i.test(outcome)) {
      status = LegalStatus.ABSOLVIDO_MERITO;
    } else if (/Anula/i.test(outcome)) {
      status = LegalStatus.ANULADO_VICIO_FORMAL;
    } else if (/Arquiva/i.test(outcome)) {
      status = LegalStatus.ARQUIVADO;
    } else if (/Prescri/i.test(outcome)) {
      status = LegalStatus.PRESCRITO;
    } else if (/Condena/i.test(outcome)) {
      status = LegalStatus.CONDENADO;
    }

    return {
      id: `legal-${id}-${idx}`,
      tituloCaso: rec.caseName || 'Registro Judicial',
      tribunalOuOrgao: rec.source || 'Poder Judiciário',
      linkFonte: 'https://portal.stf.jus.br',
      status,
      resumoCaso: rec.caseName || '',
      elementosInvestigacaoEProvas: rec.investigationFindings || '',
      desfechoRealEJuridico: rec.legalOutcome || '',
    };
  });

  const wikipediaSlug = raw.wikipediaSlug || '';
  const rawTrajectory = raw.politicalTrajectory;
  const politicalTrajectory = rawTrajectory || (raw.trajetoriaPolitica ? {
    summary: raw.resumoPerfil || `${name} - Candidato nas Eleições 2026.`,
    officesHeld: (raw.trajetoriaPolitica || []).map((t: any) => ({
      role: t.cargoOuAtividade || '',
      period: t.periodo || '',
      location: t.partidoOuLocal || 'SP / Brasil',
    })),
    partyHistory: (raw.historicoPartidario || []).map((p: any) => ({
      party: p.partido || '',
      period: p.periodo || '',
    })),
    currentAlliances: raw.coligacaoOuFederacao || raw.coalition || '',
  } : undefined);

  const resumoSituacaoJuridica = raw.resumoSituacaoJuridica || (rawLegal.length > 0
    ? rawLegal.map((r: any) => `${r.caseName}: ${r.legalOutcome}`).join('. ')
    : 'Sem registros de condenações judiciais.');

  return {
    id,
    name,
    nomeUrna,
    nomeCompleto,
    ballotNumber,
    numeroUrna,
    cargo,
    photoUrl,
    fotoUrl,
    party: partySigla,
    partido,
    coalition,
    coligacaoOuFederacao,
    estado: raw.estado || (cargo === OfficeRole.PRESIDENTE ? 'BR' : 'SP'),
    isBaseline,
    isBaselineReference,
    resumoPerfil: raw.resumoPerfil || `${name} - Candidato a ${cargo} nas Eleições 2026.`,
    termometroAlinhamento,
    pillars: raw.pillars,
    pilares,
    wikipediaSlug,
    politicalTrajectory,
    trajetoriaPolitica: raw.trajetoriaPolitica || (politicalTrajectory ? politicalTrajectory.officesHeld.map((o: any) => ({
      periodo: o.period,
      cargoOuAtividade: o.role,
      detalhes: o.location,
    })) : [
      {
        periodo: '2023 - 2026',
        cargoOuAtividade: `Atuação Política Relevante`,
        detalhes: raw.resumoPerfil || `Liderança política em destaque para as eleições de 2026.`,
      },
    ]),
    historicoPartidario: raw.historicoPartidario || (politicalTrajectory ? politicalTrajectory.partyHistory.map((p: any) => ({
      partido: p.party,
      periodo: p.period,
    })) : [
      { partido: partySigla, periodo: 'Atual' },
    ]),
    legislativeVotes: raw.legislativeVotes,
    votacoesLegislativas,
    legalRecords: raw.legalRecords,
    fichaJuridica,
    resumoSituacaoJuridica,
  };
}

export class JsonCandidateRepository implements ICandidateRepository {
  private getRoleFileName(role: OfficeRole): string {
    switch (role) {
      case OfficeRole.PRESIDENTE:
        return 'presidente.json';
      case OfficeRole.GOVERNADOR_SP:
        return 'governador_sp.json';
      case OfficeRole.SENADOR_SP:
        return 'senador_sp.json';
      case OfficeRole.DEPUTADO_FEDERAL_SP:
        return 'deputado_federal_sp.json';
      case OfficeRole.DEPUTADO_ESTADUAL_SP:
        return 'deputado_estadual_sp.json';
      default:
        throw new Error(`Cargo inválido: ${role}`);
    }
  }

  private getRoleFilePath(role: OfficeRole): string {
    return path.join(getDataDir(), 'candidates', this.getRoleFileName(role));
  }

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

  async findByRole(role: OfficeRole): Promise<Candidate[]> {
    const filePath = this.getRoleFilePath(role);
    const rawList = await this.readFileSafe<any[]>(filePath, []);
    return rawList.map(raw => normalizeCandidate(raw, role));
  }

  async findAll(): Promise<Candidate[]> {
    const roles = Object.values(OfficeRole);
    const results = await Promise.all(roles.map(r => this.findByRole(r)));
    return results.flat();
  }

  async findById(id: string): Promise<Candidate | null> {
    const all = await this.findAll();
    return all.find(c => c.id === id) || null;
  }

  async findByIds(ids: string[]): Promise<Candidate[]> {
    if (!ids || ids.length === 0) return [];
    const all = await this.findAll();
    return all.filter(c => ids.includes(c.id));
  }

  async save(candidate: Candidate): Promise<void> {
    const filePath = this.getRoleFilePath(candidate.cargo);
    const list = await this.readFileSafe<Candidate[]>(filePath, []);
    const index = list.findIndex(c => c.id === candidate.id);
    if (index >= 0) {
      list[index] = candidate;
    } else {
      list.push(candidate);
    }
    await this.writeFileSafe(filePath, list);
  }

  async saveBatch(role: OfficeRole, candidates: Candidate[]): Promise<void> {
    const filePath = this.getRoleFilePath(role);
    await this.writeFileSafe(filePath, candidates);
  }
}
