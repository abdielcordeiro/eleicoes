export enum ThematicPillar {
  SEGURANCA_PUBLICA = 'SEGURANCA_PUBLICA',
  GASTOS_PUBLICOS = 'GASTOS_PUBLICOS',
  TAMANHO_DO_ESTADO = 'TAMANHO_DO_ESTADO',
  SAUDE = 'SAUDE',
  EDUCACAO = 'EDUCACAO',
}

export interface PillarScore {
  score: number; // 0 to 10
  summary: string;
  keyProposals: string[];
  proposal?: string;
  implementation?: string;
  hasImplementationDetail?: boolean;
}

export interface CandidatePillarsProfile {
  [ThematicPillar.SEGURANCA_PUBLICA]: PillarScore;
  [ThematicPillar.GASTOS_PUBLICOS]: PillarScore;
  [ThematicPillar.TAMANHO_DO_ESTADO]: PillarScore;
  [ThematicPillar.SAUDE]: PillarScore;
  [ThematicPillar.EDUCACAO]: PillarScore;
}

export const THEMATIC_PILLARS_META: Record<ThematicPillar, { name: string; description: string; icon: string }> = {
  [ThematicPillar.SEGURANCA_PUBLICA]: {
    name: 'Segurança Pública',
    description: 'Enfrentamento ao crime organizado, endurecimento penal, apoio a policiais e segurança nas ruas.',
    icon: 'Shield',
  },
  [ThematicPillar.GASTOS_PUBLICOS]: {
    name: 'Gastos Públicos',
    description: 'Responsabilidade fiscal, controle do endividamento, corte de privilégios e equilíbrio orçamentário.',
    icon: 'BadgeDollarSign',
  },
  [ThematicPillar.TAMANHO_DO_ESTADO]: {
    name: 'Tamanho do Estado',
    description: 'Privatizações, desregulamentação, incentivo à livre iniciativa e desburocratização.',
    icon: 'Building2',
  },
  [ThematicPillar.SAUDE]: {
    name: 'Saúde',
    description: 'Parcerias público-privadas, eficiência hospitalar, digitalização e despolitização do SUS.',
    icon: 'Activity',
  },
  [ThematicPillar.EDUCACAO]: {
    name: 'Educação',
    description: 'Foco em alfabetização, ensino técnico e profissionalizante, meritocracia docente e desideologização.',
    icon: 'GraduationCap',
  },
};
