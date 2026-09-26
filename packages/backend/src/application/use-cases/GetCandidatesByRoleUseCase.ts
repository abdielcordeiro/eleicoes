import { ICandidateRepository } from '../../domain/ports/ICandidateRepository.js';
import { OfficeRole } from '../../domain/value-objects/OfficeRole.js';
import { Candidate } from '../../domain/entities/Candidate.js';

export class GetCandidatesByRoleUseCase {
  constructor(private candidateRepository: ICandidateRepository) {}

  async execute(role?: OfficeRole): Promise<Candidate[]> {
    if (role) {
      return this.candidateRepository.findByRole(role);
    }
    return this.candidateRepository.findAll();
  }
}
