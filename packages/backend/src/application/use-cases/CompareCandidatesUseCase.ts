import { ICandidateRepository } from '../../domain/ports/ICandidateRepository.js';
import { OfficeRole } from '../../domain/value-objects/OfficeRole.js';
import { Candidate } from '../../domain/entities/Candidate.js';
import { ThematicPillar, THEMATIC_PILLARS_META } from '../../domain/value-objects/ThematicPillar.js';

export interface ComparisonMatrixOutput {
  role: OfficeRole;
  baselineCandidate: Candidate | null;
  challengers: Candidate[];
  allCandidates: Candidate[];
  pillars: Array<{
    pillar: ThematicPillar;
    title: string;
    description: string;
    scores: Record<string, { score: number; summary: string }>;
  }>;
  thermometerComparison: Record<string, Candidate['termometroAlinhamento']>;
  legalComparison: Record<string, {
    resumo: string;
    totalProcessos: number;
    condenacoes: number;
    anulacoesOuArquivamentos: number;
    absolvicoesMerito: number;
    emAndamento: number;
  }>;
}

export class CompareCandidatesUseCase {
  constructor(private candidateRepository: ICandidateRepository) {}

  async execute(role: OfficeRole = OfficeRole.PRESIDENTE, candidateIds?: string[]): Promise<ComparisonMatrixOutput> {
    const candidates = await this.candidateRepository.findByRole(role);
    
    let filteredCandidates = candidates;
    if (candidateIds && candidateIds.length > 0) {
      filteredCandidates = candidates.filter(c => candidateIds.includes(c.id) || c.isBaselineReference);
    }

    const baselineCandidate = filteredCandidates.find(c => c.isBaselineReference) || null;
    const challengers = filteredCandidates.filter(c => !c.isBaselineReference);

    const pillarsList = Object.values(ThematicPillar).map(pillar => {
      const meta = THEMATIC_PILLARS_META[pillar];
      const scores: Record<string, { score: number; summary: string }> = {};

      for (const c of filteredCandidates) {
        const pillarData = c.pilares[pillar];
        scores[c.id] = {
          score: pillarData ? pillarData.score : 0,
          summary: pillarData ? pillarData.summary : 'Sem dados',
        };
      }

      return {
        pillar,
        title: meta.name,
        description: meta.description,
        scores,
      };
    });

    const thermometerComparison: Record<string, Candidate['termometroAlinhamento']> = {};
    const legalComparison: Record<string, {
      resumo: string;
      totalProcessos: number;
      condenacoes: number;
      anulacoesOuArquivamentos: number;
      absolvicoesMerito: number;
      emAndamento: number;
    }> = {};

    for (const c of filteredCandidates) {
      thermometerComparison[c.id] = c.termometroAlinhamento;
      
      const records = c.fichaJuridica || [];
      legalComparison[c.id] = {
        resumo: c.resumoSituacaoJuridica,
        totalProcessos: records.length,
        condenacoes: records.filter(r => r.status === 'CONDENADO').length,
        anulacoesOuArquivamentos: records.filter(r => r.status === 'ANULADO_VICIO_FORMAL' || r.status === 'ARQUIVADO' || r.status === 'PRESCRITO').length,
        absolvicoesMerito: records.filter(r => r.status === 'ABSOLVIDO_MERITO').length,
        emAndamento: records.filter(r => r.status === 'EM_ANDAMENTO').length,
      };
    }

    return {
      role,
      baselineCandidate,
      challengers,
      allCandidates: filteredCandidates,
      pillars: pillarsList,
      thermometerComparison,
      legalComparison,
    };
  }
}
