import fs from 'node:fs/promises';
import path from 'node:path';
import { ISantinhoRepository } from '../../domain/ports/ISantinhoRepository.js';
import { SantinhoBallot, SantinhoBallotSelections } from '../../domain/entities/SantinhoBallot.js';
import { getDataDir } from './dataPath.js';

export class JsonSantinhoRepository implements ISantinhoRepository {
  private getFilePath(): string {
    return path.join(getDataDir(), 'user', 'meu_santinho.json');
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

  async get(): Promise<SantinhoBallot> {
    const filePath = this.getFilePath();
    const ballot = await this.readFileSafe<SantinhoBallot>(filePath, {
      id: 'meu_santinho_sp_2026',
      ultimaAtualizacao: new Date().toISOString(),
      selections: {
        deputadoFederalId: null,
        deputadoEstadualId: null,
        senador1Id: null,
        senador2Id: null,
        governadorId: null,
        presidenteId: null,
      },
    });
    return ballot;
  }

  async save(selections: SantinhoBallotSelections): Promise<SantinhoBallot> {
    const filePath = this.getFilePath();
    const ballot: SantinhoBallot = {
      id: 'meu_santinho_sp_2026',
      ultimaAtualizacao: new Date().toISOString(),
      selections,
    };
    await this.writeFileSafe(filePath, ballot);
    return ballot;
  }
}
