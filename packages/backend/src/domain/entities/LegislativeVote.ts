export type VoteChoice = 'SIM' | 'NAO' | 'ABSTENCAO' | 'OBSTRUCAO' | 'AUSENTE';

export interface LegislativeVote {
  id: string;
  projetoCodigo: string; // Ex: 'PL 2253/2022' (Fim das Saidinhas), 'PEC 45/2019' (Reforma Tributária)
  tema: string; // Ex: 'Endurecimento Penal', 'Reforma Tributária', 'Marco Temporal', 'Arcabouço Fiscal'
  ementa: string;
  data: string; // YYYY-MM-DD
  voto: VoteChoice;
  orientacaoBancada: string;
  descricaoImpacto: string;
  linkOficial: string;
}
