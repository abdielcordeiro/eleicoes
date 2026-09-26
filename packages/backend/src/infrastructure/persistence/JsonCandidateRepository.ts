import fs from 'node:fs/promises';
import path from 'node:path';
import { ICandidateRepository } from '../../domain/ports/ICandidateRepository.js';
import { Candidate } from '../../domain/entities/Candidate.js';
import { OfficeRole } from '../../domain/value-objects/OfficeRole.js';
import { getDataDir } from './dataPath.js';

export class JsonCandidateRepository implements ICandidateRepository {
  private getRoleFileName(role: OfficeRole): string {
    switch (role) {
      case OfficeRole.PRESIDENTE:
        return 'presidente.json';
      case OfficeRole.GOVERNADOR_SP:
        return 'governador_sp.json';
      case OfficeRole.SENADOR_SP:
        return 'senador_sp.json';
      case OfficeRole.DEPUTADO_FEDERAL_SP:
        return 'deputado_federal_sp.json';
      case OfficeRole.DEPUTADO_ESTADUAL_SP:
        return 'deputado_estadual_sp.json';
      default:
        throw new Error(`Cargo inválido: ${role}`);
    }
  }

  private getRoleFilePath(role: OfficeRole): string {
    return path.join(getDataDir(), 'candidates', this.getRoleFileName(role));
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

  async findByRole(role: OfficeRole): Promise<Candidate[]> {
    const filePath = this.getRoleFilePath(role);
    return this.readFileSafe<Candidate[]>(filePath, []);
  }

  async findAll(): Promise<Candidate[]> {
    const roles = Object.values(OfficeRole);
    const results = await Promise.all(roles.map(r => this.findByRole(r)));
    return results.flat();
  }

  async findById(id: string): Promise<Candidate | null> {
    const all = await this.findAll();
    return all.find(c => c.id === id) || null;
  }

  async findByIds(ids: string[]): Promise<Candidate[]> {
    if (!ids || ids.length === 0) return [];
    const all = await this.findAll();
    return all.filter(c => ids.includes(c.id));
  }

  async save(candidate: Candidate): Promise<void> {
    const filePath = this.getRoleFilePath(candidate.cargo);
    const list = await this.readFileSafe<Candidate[]>(filePath, []);
    const index = list.findIndex(c => c.id === candidate.id);
    if (index >= 0) {
      list[index] = candidate;
    } else {
      list.push(candidate);
    }
    await this.writeFileSafe(filePath, list);
  }

  async saveBatch(role: OfficeRole, candidates: Candidate[]): Promise<void> {
    const filePath = this.getRoleFilePath(role);
    await this.writeFileSafe(filePath, candidates);
  }
}
