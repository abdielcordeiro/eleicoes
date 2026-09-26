import { OfficeRole } from '../value-objects/OfficeRole.js';
import { CandidatePillarsProfile } from '../value-objects/ThematicPillar.js';
import { PoliticalParty } from './PoliticalParty.js';
import { LegislativeVote } from './LegislativeVote.js';
import { LegalRecord } from './LegalRecord.js';

export interface PoliticalTrajectoryItem {
  periodo: string;
  cargoOuAtividade: string;
  detalhes: string;
  partidoOuLocal?: string;
}

export interface PartyHistoryItem {
  partido: string;
  periodo: string;
}

export interface AlignmentThermometer {
  liberdadeEconomica: number; // 0 - 100
  estadoEnxuto: number; // 0 - 100
  conservadorismo: number; // 0 - 100
  segurancaRigorosa: number; // 0 - 100
  scoreGeral: number; // Média ponderada
  classificacao: string; // Ex: 'Direita Liberal', 'Direita Conservadora', 'Centro', 'Esquerda Desenvolvimentista'
}

export interface CompactPillars {
  segurancaPublica: string;
  gastosPublicos: string;
  tamanhoDoEstado: string;
  saude: string;
  educacao: string;
  [key: string]: string;
}

export interface CompactVote {
  code: string;
  title: string;
  vote: string;
  summary: string;
  source: string;
}

export interface CompactLegalRecord {
  caseName: string;
  source: string;
  investigationFindings: string;
  legalOutcome: string;
}

export interface Candidate {
  id: string; // ex: 'flavio-bolsonaro', 'romeu-zema', 'lula'
  nomeCompleto: string;
  nomeUrna: string;
  numeroUrna: number;
  cargo: OfficeRole;
  fotoUrl: string;
  partido: PoliticalParty;
  coligacaoOuFederacao: string;
  estado: string; // 'BR' para Presidente, 'SP' para outros
  isBaselineReference?: boolean; // True para Luiz Inácio Lula da Silva como baseline
  resumoPerfil: string;
  termometroAlinhamento: AlignmentThermometer;
  pilares: CandidatePillarsProfile;
  trajetoriaPolitica: PoliticalTrajectoryItem[];
  historicoPartidario: PartyHistoryItem[];
  votacoesLegislativas: LegislativeVote[];
  fichaJuridica: LegalRecord[];
  resumoSituacaoJuridica: string;

  // Campos compactos alternativos
  name?: string;
  ballotNumber?: string;
  party?: string;
  coalition?: string;
  role?: OfficeRole | string;
  photoUrl?: string;
  isBaseline?: boolean;
  pillars?: CompactPillars;
  legislativeVotes?: CompactVote[];
  legalRecords?: CompactLegalRecord[];
}
