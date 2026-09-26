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
}
