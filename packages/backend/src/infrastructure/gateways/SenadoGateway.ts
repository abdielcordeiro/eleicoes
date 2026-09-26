import axios from 'axios';

export class SenadoGateway {
  private readonly baseUrl = 'https://legis.senado.leg.br/dadosabertos';

  async checkApiStatus(): Promise<{ ok: boolean; message: string }> {
    try {
      const response = await axios.get(`${this.baseUrl}/senador/lista/atual.json`, {
        timeout: 4000,
        headers: { Accept: 'application/json' },
      });
      return { ok: response.status === 200, message: 'Senado Federal API Legis Online' };
    } catch (err: any) {
      return { ok: false, message: `Senado API indisponível ou offline (${err.message}). Utilizando cache local.` };
    }
  }
}
