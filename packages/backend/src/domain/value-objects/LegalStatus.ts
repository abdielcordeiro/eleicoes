export enum LegalStatus {
  ABSOLVIDO_MERITO = 'ABSOLVIDO_MERITO',
  ANULADO_VICIO_FORMAL = 'ANULADO_VICIO_FORMAL',
  PRESCRITO = 'PRESCRITO',
  ARQUIVADO = 'ARQUIVADO',
  CONDENADO = 'CONDENADO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
}

export interface LegalStatusMetadata {
  status: LegalStatus;
  label: string;
  badgeClass: string;
  isMeritAcquittal: boolean;
  isProceduralAnnulment: boolean;
  description: string;
}

export const LEGAL_STATUS_CONFIG: Record<LegalStatus, LegalStatusMetadata> = {
  [LegalStatus.ABSOLVIDO_MERITO]: {
    status: LegalStatus.ABSOLVIDO_MERITO,
    label: 'Absolvido no Mérito',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    isMeritAcquittal: true,
    isProceduralAnnulment: false,
    description: 'Comprovada inocência ou cabal inexistência do fato imputado pelo julgador.',
  },
  [LegalStatus.ANULADO_VICIO_FORMAL]: {
    status: LegalStatus.ANULADO_VICIO_FORMAL,
    label: 'Anulado por Vício Formal',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    isMeritAcquittal: false,
    isProceduralAnnulment: true,
    description: 'Extinção ou reinício por incompetência de juízo, nulidade de provas ou falhas processuais, sem atestado de mérito.',
  },
  [LegalStatus.PRESCRITO]: {
    status: LegalStatus.PRESCRITO,
    label: 'Extinto por Prescrição',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
    isMeritAcquittal: false,
    isProceduralAnnulment: true,
    description: 'O Estado perdeu o prazo legal para punir devido ao decurso do tempo.',
  },
  [LegalStatus.ARQUIVADO]: {
    status: LegalStatus.ARQUIVADO,
    label: 'Arquivado',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    isMeritAcquittal: false,
    isProceduralAnnulment: false,
    description: 'Investigação ou processo encerrado por falta de elementos suficientes para denúncia.',
  },
  [LegalStatus.CONDENADO]: {
    status: LegalStatus.CONDENADO,
    label: 'Condenado',
    badgeClass: 'bg-red-100 text-red-800 border-red-300',
    isMeritAcquittal: false,
    isProceduralAnnulment: false,
    description: 'Sentença condenatória proferida por órgão competente.',
  },
  [LegalStatus.EM_ANDAMENTO]: {
    status: LegalStatus.EM_ANDAMENTO,
    label: 'Em Andamento',
    badgeClass: 'bg-orange-100 text-orange-800 border-orange-300',
    isMeritAcquittal: false,
    isProceduralAnnulment: false,
    description: 'Inquérito, instrução processual ou recurso em tramitação nos tribunais.',
  },
};
