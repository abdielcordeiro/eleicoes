export class TseGateway {
  private readonly baseUrl = 'https://divulgacandcontas.tse.jus.br/divulga/rest/v1';

  async checkApiStatus(): Promise<{ ok: boolean; message: string; url: string; status: number }> {
    const url = `${this.baseUrl}/eleicao/eleicoes`;
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(6000),
      });
      return {
        ok: response.status === 200,
        message: 'TSE DivulgaCandContas API Online',
        url,
        status: response.status,
      };
    } catch (err: any) {
      return {
        ok: false,
        message: `TSE API indisponível ou offline (${err.message})`,
        url,
        status: 0,
      };
    }
  }
}
