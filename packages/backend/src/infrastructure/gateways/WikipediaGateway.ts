export interface WikipediaSummary {
  title?: string;
  extract?: string;
  description?: string;
  thumbnailUrl?: string;
  originalImageUrl?: string;
  contentUrls?: {
    desktop?: { page?: string };
  };
}

export class WikipediaGateway {
  private readonly baseUrl = 'https://pt.wikipedia.org/api/rest_v1/page/summary';

  async fetchPageSummary(slug: string): Promise<WikipediaSummary | null> {
    if (!slug) return null;
    try {
      const url = `${this.baseUrl}/${encodeURIComponent(slug.trim())}`;
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'VotoConsciente2026/1.0 (https://github.com/voto-consciente; contato@votoconsciente.org)',
        },
        signal: AbortSignal.timeout(6000),
      });

      if (!res.ok) return null;
      const data = await res.json() as any;
      return {
        title: data.title,
        extract: data.extract,
        description: data.description,
        thumbnailUrl: data.thumbnail?.source,
        originalImageUrl: data.originalimage?.source,
        contentUrls: data.content_urls,
      };
    } catch {
      return null;
    }
  }

  async checkApiStatus(): Promise<{ ok: boolean; message: string; url: string; status: number }> {
    const url = `${this.baseUrl}/Brasil`;
    try {
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'VotoConsciente2026/1.0',
        },
        signal: AbortSignal.timeout(5000),
      });
      return {
        ok: res.ok,
        message: res.ok ? 'Wikipédia REST API Online' : `Wikipédia API retornou status HTTP ${res.status}`,
        url,
        status: res.status,
      };
    } catch (err: any) {
      return {
        ok: false,
        message: `Wikipédia API offline ou timeout (${err.message})`,
        url,
        status: 0,
      };
    }
  }
}
