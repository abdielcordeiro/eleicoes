import { OfficeRole } from '../value-objects/OfficeRole.js';

export interface PollCandidateShare {
  candidateId: string;
  candidateName: string;
  partySigla: string;
  percentage: number;
  color?: string;
}

export interface PollResult {
  id: string;
  cargo: OfficeRole;
  cenario: string; // Ex: 'Estimulada - 1º Turno (Cenário Principal)'
  instituto: string; // Ex: 'AtlasIntel', 'Paraná Pesquisas', 'Quaest', 'Datafolha'
  numeroRegistroTSE: string; // Ex: 'BR-04981/2026' ou 'SP-01298/2026'
  dataColetaInicio: string; // YYYY-MM-DD
  dataColetaFim: string; // YYYY-MM-DD
  dataHoraDivulgacao: string; // ISO String: YYYY-MM-DDTHH:mm:ssZ
  margemErro: number; // Ex: 2.0 (significa +- 2,0 p.p.)
  nivelConfianca: number; // Ex: 95
  tamanhoAmostra: number; // Ex: 2500 entrevistas
  fontesAuditaveis: string;
  votosValidos?: boolean;
  intencoes: PollCandidateShare[];
  brancosNulos: number;
  indecisos: number;
}
