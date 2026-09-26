export enum OfficeRole {
  PRESIDENTE = 'PRESIDENTE',
  GOVERNADOR_SP = 'GOVERNADOR_SP',
  SENADOR_SP = 'SENADOR_SP',
  DEPUTADO_FEDERAL_SP = 'DEPUTADO_FEDERAL_SP',
  DEPUTADO_ESTADUAL_SP = 'DEPUTADO_ESTADUAL_SP',
}

export interface OfficeRoleMetadata {
  role: OfficeRole;
  label: string;
  digits: number;
  ballotOrder: number; // 2026 Ballot Order: Dep. Fed -> Dep. Est -> Sen 1 -> Sen 2 -> Gov -> Pres
  maxVotes: number;
}

export const OFFICE_ROLE_CONFIG: Record<OfficeRole, OfficeRoleMetadata> = {
  [OfficeRole.DEPUTADO_FEDERAL_SP]: {
    role: OfficeRole.DEPUTADO_FEDERAL_SP,
    label: 'Deputado Federal (SP)',
    digits: 4,
    ballotOrder: 1,
    maxVotes: 1,
  },
  [OfficeRole.DEPUTADO_ESTADUAL_SP]: {
    role: OfficeRole.DEPUTADO_ESTADUAL_SP,
    label: 'Deputado Estadual (SP)',
    digits: 5,
    ballotOrder: 2,
    maxVotes: 1,
  },
  [OfficeRole.SENADOR_SP]: {
    role: OfficeRole.SENADOR_SP,
    label: 'Senador (SP - 2 Vagas)',
    digits: 3,
    ballotOrder: 3,
    maxVotes: 2,
  },
  [OfficeRole.GOVERNADOR_SP]: {
    role: OfficeRole.GOVERNADOR_SP,
    label: 'Governador (SP)',
    digits: 2,
    ballotOrder: 4,
    maxVotes: 1,
  },
  [OfficeRole.PRESIDENTE]: {
    role: OfficeRole.PRESIDENTE,
    label: 'Presidente da República',
    digits: 2,
    ballotOrder: 5,
    maxVotes: 1,
  },
};
