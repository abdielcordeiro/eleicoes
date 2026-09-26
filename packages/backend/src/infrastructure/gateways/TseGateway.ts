import axios from 'axios';

export class TseGateway {
  private readonly baseUrl = 'https://divulgacandcontas.tse.jus.br/divulga/rest/v1';

  async checkApiStatus(): Promise<{ ok: boolean; message: string }> {
    try {
      const response = await axios.get(`${this.baseUrl}/eleicao/eleicoes`, {
        timeout: 4000,
        headers: { Accept: 'application/json' },
      });
      return { ok: response.status === 200, message: 'TSE DivulgaCandContas API Online' };
    } catch (err: any) {
      return { ok: false, message: `TSE API indisponível ou offline (${err.message}). Utilizando base auditada local.` };
    }
  }
}
