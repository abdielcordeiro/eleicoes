export interface PoliticalParty {
  id: string;
  sigla: string;
  numero: number;
  nome: string;
  espectro: 'Direita' | 'Centro-Direita' | 'Centro' | 'Centro-Esquerda' | 'Esquerda';
  corHex: string;
  logoUrl?: string;
}
