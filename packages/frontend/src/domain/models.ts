export enum OfficeRole {
  PRESIDENTE = 'PRESIDENTE',
  GOVERNADOR_SP = 'GOVERNADOR_SP',
  SENADOR_SP = 'SENADOR_SP',
  DEPUTADO_FEDERAL_SP = 'DEPUTADO_FEDERAL_SP',
  DEPUTADO_ESTADUAL_SP = 'DEPUTADO_ESTADUAL_SP',
}

export enum LegalStatus {
  ABSOLVIDO_MERITO = 'ABSOLVIDO_MERITO',
  ANULADO_VICIO_FORMAL = 'ANULADO_VICIO_FORMAL',
  PRESCRITO = 'PRESCRITO',
  ARQUIVADO = 'ARQUIVADO',
  CONDENADO = 'CONDENADO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
}

export enum ThematicPillar {
  SEGURANCA_PUBLICA = 'SEGURANCA_PUBLICA',
  GASTOS_PUBLICOS = 'GASTOS_PUBLICOS',
  TAMANHO_DO_ESTADO = 'TAMANHO_DO_ESTADO',
  SAUDE = 'SAUDE',
  EDUCACAO = 'EDUCACAO',
}

export interface PoliticalParty {
  id: string;
  sigla: string;
  numero: number;
  nome: string;
  espectro: string;
  corHex: string;
  logoUrl?: string;
}

export interface PillarScore {
  score: number;
  summary: string;
  keyProposals: string[];
}

export interface CandidatePillarsProfile {
  [ThematicPillar.SEGURANCA_PUBLICA]: PillarScore;
  [ThematicPillar.GASTOS_PUBLICOS]: PillarScore;
  [ThematicPillar.TAMANHO_DO_ESTADO]: PillarScore;
  [ThematicPillar.SAUDE]: PillarScore;
  [ThematicPillar.EDUCACAO]: PillarScore;
}

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

export interface LegislativeVote {
  id: string;
  projetoCodigo: string;
  tema: string;
  ementa: string;
  data: string;
  voto: 'SIM' | 'NAO' | 'ABSTENCAO' | 'OBSTRUCAO' | 'AUSENTE';
  orientacaoBancada: string;
  descricaoImpacto: string;
  linkOficial: string;
}

export interface LegalRecord {
  id: string;
  tituloCaso: string;
  tribunalOuOrgao: string;
  numeroProcessoOuInquerito?: string;
  linkFonte: string;
  dataInicio?: string;
  dataDesfecho?: string;
  status: LegalStatus;
  resumoCaso: string;
  elementosInvestigacaoEProvas: string;
  desfechoRealEJuridico: string;
}

export interface AlignmentThermometer {
  liberdadeEconomica: number;
  estadoEnxuto: number;
  conservadorismo: number;
  segurancaRigorosa: number;
  scoreGeral: number;
  classificacao: string;
}

export interface Candidate {
  id: string;
  nomeCompleto: string;
  nomeUrna: string;
  numeroUrna: number;
  cargo: OfficeRole;
  fotoUrl: string;
  partido: PoliticalParty;
  coligacaoOuFederacao: string;
  estado: string;
  isBaselineReference?: boolean;
  resumoPerfil: string;
  termometroAlinhamento: AlignmentThermometer;
  pilares: CandidatePillarsProfile;
  trajetoriaPolitica: PoliticalTrajectoryItem[];
  historicoPartidario: PartyHistoryItem[];
  votacoesLegislativas: LegislativeVote[];
  fichaJuridica: LegalRecord[];
  resumoSituacaoJuridica: string;
}

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
  cenario: string;
  instituto: string;
  numeroRegistroTSE: string;
  dataColetaInicio: string;
  dataColetaFim: string;
  dataHoraDivulgacao: string;
  margemErro: number;
  nivelConfianca: number;
  tamanhoAmostra: number;
  fontesAuditaveis: string;
  votosValidos?: boolean;
  intencoes: PollCandidateShare[];
  brancosNulos: number;
  indecisos: number;
}

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
  thermometerComparison: Record<string, AlignmentThermometer>;
  legalComparison: Record<string, {
    resumo: string;
    totalProcessos: number;
    condenacoes: number;
    anulacoesOuArquivamentos: number;
    absolvicoesMerito: number;
    emAndamento: number;
  }>;
}

export interface SyncResult {
  timestamp: string;
  formattedTimestamp: string;
  sources: string[];
  recordsUpdated: number;
  message: string;
}

export interface SyncMetadata {
  lastSync: string;
  formattedDate: string;
  sources: string[];
  status: 'SUCCESS' | 'ERROR' | 'IDLE';
  recordsUpdated: number;
  details?: string;
}
