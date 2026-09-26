export class CamaraGateway {
  private readonly baseUrl = 'https://dadosabertos.camara.leg.br/api/v2';

  async checkApiStatus(): Promise<{ ok: boolean; message: string; url: string; status: number }> {
    const url = `${this.baseUrl}/referencias/proposicoes/codTipoAutor`;
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(6000),
      });
      return {
        ok: response.status === 200,
        message: 'Câmara dos Deputados API v2 Online',
        url,
        status: response.status,
      };
    } catch (err: any) {
      return {
        ok: false,
        message: `Câmara API indisponível ou offline (${err.message})`,
        url,
        status: 0,
      };
    }
  }

  async getDeputadosSP(): Promise<any[]> {
    const url = `${this.baseUrl}/deputados?siglaUf=SP&ordem=ASC&ordenarPor=nome`;
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) return [];
      const json = await response.json() as any;
      return json.dados || [];
    } catch {
      return [];
    }
  }

  async getDeputadoById(id: number | string): Promise<any | null> {
    const url = `${this.baseUrl}/deputados/${id}`;
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(6000),
      });
      if (!response.ok) return null;
      const json = await response.json() as any;
      return json.dados || null;
    } catch {
      return null;
    }
  }

  async getProposicoes(params?: Record<string, string>): Promise<any[]> {
    const query = new URLSearchParams(params || { siglaTipo: 'PL', ordem: 'DESC', ordenarPor: 'id', itens: '10' });
    const url = `${this.baseUrl}/proposicoes?${query.toString()}`;
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(6000),
      });
      if (!response.ok) return [];
      const json = await response.json() as any;
      return json.dados || [];
    } catch {
      return [];
    }
  }

  async getVotacaoVotos(votacaoId: string): Promise<any[]> {
    const url = `${this.baseUrl}/votacoes/${votacaoId}/votos`;
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(6000),
      });
      if (!response.ok) return [];
      const json = await response.json() as any;
      return json.dados || [];
    } catch {
      return [];
    }
  }
}
