import { Candidate } from './Candidate.js';

export interface SantinhoBallotSelections {
  deputadoFederalId?: string | null;
  deputadoEstadualId?: string | null;
  senador1Id?: string | null;
  senador2Id?: string | null;
  governadorId?: string | null;
  presidenteId?: string | null;
}

export interface SantinhoBallotPopulated {
  id: string;
  ultimaAtualizacao: string;
  deputadoFederal?: Candidate | null;
  deputadoEstadual?: Candidate | null;
  senador1?: Candidate | null;
  senador2?: Candidate | null;
  governador?: Candidate | null;
  presidente?: Candidate | null;
}

export interface SantinhoBallot {
  id: string;
  ultimaAtualizacao: string;
  selections: SantinhoBallotSelections;
}
