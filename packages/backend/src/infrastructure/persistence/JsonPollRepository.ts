import fs from 'node:fs/promises';
import path from 'node:path';
import { IPollRepository } from '../../domain/ports/IPollRepository.js';
import { PollResult } from '../../domain/entities/PollResult.js';
import { OfficeRole } from '../../domain/value-objects/OfficeRole.js';
import { getDataDir } from './dataPath.js';

export class JsonPollRepository implements IPollRepository {
  private getPollFilePath(role: OfficeRole = OfficeRole.PRESIDENTE): string {
    const fileName = role === OfficeRole.PRESIDENTE ? 'presidencial_2026.json' : `polls_${role.toLowerCase()}.json`;
    return path.join(getDataDir(), 'polls', fileName);
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

  async findLatestByRole(role: OfficeRole): Promise<PollResult | null> {
    const polls = await this.findAllByRole(role);
    if (polls.length === 0) return null;
    // Sort by publication timestamp descending
    polls.sort((a, b) => new Date(b.dataHoraDivulgacao).getTime() - new Date(a.dataHoraDivulgacao).getTime());
    return polls[0];
  }

  async findAllByRole(role: OfficeRole): Promise<PollResult[]> {
    const filePath = this.getPollFilePath(role);
    return this.readFileSafe<PollResult[]>(filePath, []);
  }

  async findAll(): Promise<PollResult[]> {
    // Read polls directory
    const pollsDir = path.join(getDataDir(), 'polls');
    try {
      const files = await fs.readdir(pollsDir);
      let allPolls: PollResult[] = [];
      for (const file of files) {
        if (file.endsWith('.json')) {
          const content = await this.readFileSafe<PollResult[]>(path.join(pollsDir, file), []);
          allPolls = allPolls.concat(content);
        }
      }
      return allPolls;
    } catch {
      return [];
    }
  }

  async save(poll: PollResult): Promise<void> {
    const filePath = this.getPollFilePath(poll.cargo);
    const polls = await this.readFileSafe<PollResult[]>(filePath, []);
    const idx = polls.findIndex(p => p.id === poll.id);
    if (idx >= 0) {
      polls[idx] = poll;
    } else {
      polls.push(poll);
    }
    await this.writeFileSafe(filePath, polls);
  }
}
