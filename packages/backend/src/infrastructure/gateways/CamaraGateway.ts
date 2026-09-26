import axios from 'axios';

export class CamaraGateway {
  private readonly baseUrl = 'https://dadosabertos.camara.leg.br/api/v2';

  async checkApiStatus(): Promise<{ ok: boolean; message: string }> {
    try {
      const response = await axios.get(`${this.baseUrl}/referencias/proposicoes/codTipoAutor`, {
        timeout: 4000,
        headers: { Accept: 'application/json' },
      });
      return { ok: response.status === 200, message: 'Câmara dos Deputados API v2 Online' };
    } catch (err: any) {
      return { ok: false, message: `Câmara API indisponível ou offline (${err.message}). Utilizando cache local.` };
    }
  }

  async searchProposicoes(termo: string): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/proposicoes`, {
        params: { siglaTipo: 'PL', ordem: 'DESC', ordenarPor: 'id', itens: 5 },
        timeout: 4000,
      });
      return response.data?.dados || [];
    } catch {
      return [];
    }
  }
}
