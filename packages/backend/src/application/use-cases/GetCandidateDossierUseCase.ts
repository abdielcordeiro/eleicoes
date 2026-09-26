import { ICandidateRepository } from '../../domain/ports/ICandidateRepository.js';
import { Candidate } from '../../domain/entities/Candidate.js';

export class GetCandidateDossierUseCase {
  constructor(private candidateRepository: ICandidateRepository) {}

  async execute(id: string): Promise<Candidate> {
    const candidate = await this.candidateRepository.findById(id);
    if (!candidate) {
      throw new Error(`Candidato com ID '${id}' não foi encontrado.`);
    }
    return candidate;
  }
}
