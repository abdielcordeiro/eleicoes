import { Candidate } from '../entities/Candidate.js';
import { OfficeRole } from '../value-objects/OfficeRole.js';

export interface ICandidateRepository {
  findAll(): Promise<Candidate[]>;
  findByRole(role: OfficeRole): Promise<Candidate[]>;
  findById(id: string): Promise<Candidate | null>;
  findByIds(ids: string[]): Promise<Candidate[]>;
  save(candidate: Candidate): Promise<void>;
  saveBatch(role: OfficeRole, candidates: Candidate[]): Promise<void>;
}
