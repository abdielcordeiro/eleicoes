export class SenadoGateway {
  private readonly baseUrl = 'https://legis.senado.leg.br/dadosabertos';

  async checkApiStatus(): Promise<{ ok: boolean; message: string; url: string; status: number }> {
    const url = `${this.baseUrl}/senador/lista/atual.json`;
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(6000),
      });
      return {
        ok: response.status === 200,
        message: 'Senado Federal API Legis Online',
        url,
        status: response.status,
      };
    } catch (err: any) {
      return {
        ok: false,
        message: `Senado API indisponível ou offline (${err.message})`,
        url,
        status: 0,
      };
    }
  }

  async getSenadoresAtuais(): Promise<any[]> {
    const url = `${this.baseUrl}/senador/lista/atual.json`;
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) return [];
      const json = await response.json() as any;
      return json.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar || [];
    } catch {
      return [];
    }
  }

  async getVotacoesSenador(codigo: number | string): Promise<any[]> {
    const url = `${this.baseUrl}/senador/${codigo}/votacoes.json`;
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) return [];
      const json = await response.json() as any;
      return json.VotacaoParlamentar?.Parlamentar?.Votacoes?.Votacao || [];
    } catch {
      return [];
    }
  }
}
