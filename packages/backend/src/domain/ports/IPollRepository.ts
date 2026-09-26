import { PollResult } from '../entities/PollResult.js';
import { OfficeRole } from '../value-objects/OfficeRole.js';

export interface IPollRepository {
  findLatestByRole(role: OfficeRole): Promise<PollResult | null>;
  findAll(): Promise<PollResult[]>;
  save(poll: PollResult): Promise<void>;
}
