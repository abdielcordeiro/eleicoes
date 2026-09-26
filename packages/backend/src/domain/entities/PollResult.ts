import { OfficeRole } from '../value-objects/OfficeRole.js';

export interface PollCandidateShare {
  candidateId: string;
  candidateName: string;
  partySigla: string;
  percentage: number;
  color?: string;
  realTimePercent?: number;
  quaestPercent?: number;
  spectrum?: string;
  isBaseline?: boolean;
}

export interface SecondRoundScenario {
  scenario: string;
  lula: number;
  opponent: number;
  undecided: number;
  status: string;
}

export interface PollResult {
  id: string;
  cargo: OfficeRole;
  cenario: string; // Ex: 'Estimulada - 1º Turno (Cenário Principal)'
  instituto: string; // Ex: 'AtlasIntel / Bloomberg', 'Vox Brasil / Poder360'
  numeroRegistroTSE: string; // Ex: 'BR-04739/2026', 'SP-07745/2026'
  dataColetaInicio: string; // YYYY-MM-DD ou texto do período
  dataColetaFim: string; // YYYY-MM-DD
  dataHoraDivulgacao: string; // ISO String ou texto formatado
  margemErro: number; // Ex: 1.0 (significa +- 1,0 p.p.)
  nivelConfianca: number; // Ex: 95
  tamanhoAmostra: number; // Ex: 5015 entrevistas
  fontesAuditaveis: string;
  votosValidos?: boolean;
  intencoes: PollCandidateShare[];
  brancosNulos: number;
  indecisos: number;
  secondRoundRunoff?: SecondRoundScenario[];
  fieldPeriod?: string;
  publishedAtText?: string;
  marginOfErrorText?: string;
  isDualComparison?: boolean;
}
