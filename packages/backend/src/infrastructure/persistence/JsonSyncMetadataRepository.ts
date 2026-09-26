import fs from 'node:fs/promises';
import path from 'node:path';
import { getDataDir } from './dataPath.js';

export interface SyncMetadata {
  lastSync: string; // ISO format
  formattedDate: string; // Ex: '25/09/2026 às 22:15:00'
  sources: string[];
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
    return this.readFileSafe<SyncMetadata>(filePath, {
      lastSync: new Date().toISOString(),
      formattedDate: new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'medium',
      }).format(new Date()),
      sources: ['TSE', 'Câmara dos Deputados', 'Senado Federal', 'Institutos Registrados (AtlasIntel/Paraná Pesquisas)'],
      status: 'IDLE',
      recordsUpdated: 0,
      details: 'Sincronização inicial local carregada.',
    });
  }

  async saveSyncLog(data: SyncMetadata): Promise<void> {
    const filePath = this.getFilePath();
    await this.writeFileSafe(filePath, data);
  }
}
