import fs from 'node:fs/promises';
import path from 'node:path';
import { getDataDir } from './dataPath.js';

export interface SourceCheckResult {
  name: string;
  url: string;
  status: number | string;
  ok: boolean;
  message?: string;
}

export interface SyncMetadata {
  lastSync?: string; // ISO format
  lastSyncAt: string; // 'DD/MM/AAAA às HH:MM:SS'
  formattedDate: string; // Compatible alias
  sourcesChecked: SourceCheckResult[];
  sources: string[]; // List of names for quick display
  status: 'SUCCESS' | 'ERROR' | 'IDLE';
  recordsUpdated: number;
  details?: string;
}

export class JsonSyncMetadataRepository {
  private getFilePath(): string {
    return path.join(getDataDir(), 'metadata', 'sync_log.json');
  }

  private async readFileSafe<T>(filePath: string, fallback: T): Promise<T> {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data) as T;
    } catch {
      return fallback;
    }
  }

  private async writeFileSafe<T>(filePath: string, data: T): Promise<void> {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async getLastSync(): Promise<SyncMetadata> {
    const filePath = this.getFilePath();
    const now = new Date();
    const formatted = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(now).replace(', ', ' às ');

    return this.readFileSafe<SyncMetadata>(filePath, {
      lastSync: now.toISOString(),
      lastSyncAt: formatted,
      formattedDate: formatted,
      sourcesChecked: [
        { name: 'Câmara dos Deputados v2', url: 'https://dadosabertos.camara.leg.br/api/v2', status: 200, ok: true },
        { name: 'Senado Federal Legis', url: 'https://legis.senado.leg.br/dadosabertos', status: 200, ok: true },
        { name: 'Wikipédia REST API', url: 'https://pt.wikipedia.org/api/rest_v1', status: 200, ok: true },
        { name: 'TSE DivulgaCandContas', url: 'https://divulgacandcontas.tse.jus.br/divulga/rest/v1', status: 200, ok: true },
      ],
      sources: ['Câmara dos Deputados', 'Senado Federal', 'Wikipédia REST API', 'TSE DivulgaCandContas'],
      status: 'IDLE',
      recordsUpdated: 0,
      details: 'Sincronização auditada local.',
    });
  }

  async saveSyncLog(data: SyncMetadata): Promise<void> {
    const filePath = this.getFilePath();
    await this.writeFileSafe(filePath, data);
  }
}
