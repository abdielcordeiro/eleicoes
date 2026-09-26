import { LegalStatus } from '../value-objects/LegalStatus.js';

export interface LegalRecord {
  id: string;
  tituloCaso: string;
  tribunalOuOrgao: string; // Ex: STF, STJ, TJ-RJ, TRF-4, TSE, PGR
  numeroProcessoOuInquerito?: string;
  linkFonte: string;
  dataInicio?: string;
  dataDesfecho?: string;
  status: LegalStatus;
  
  // Coluna 1: O Caso e a Fonte
  resumoCaso: string;
  
  // Coluna 2: O que apontavam as Provas / Investigações
  elementosInvestigacaoEProvas: string;
  
  // Coluna 3: Situação Real e Desfecho Jurídico (Diferenciação clara: Mérito vs Vício Formal / Prescrição)
  desfechoRealEJuridico: string;
}
