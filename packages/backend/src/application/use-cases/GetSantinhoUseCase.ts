import { ISantinhoRepository } from '../../domain/ports/ISantinhoRepository.js';
import { ICandidateRepository } from '../../domain/ports/ICandidateRepository.js';
import { SantinhoBallotPopulated } from '../../domain/entities/SantinhoBallot.js';

export class GetSantinhoUseCase {
  constructor(
    private santinhoRepository: ISantinhoRepository,
    private candidateRepository: ICandidateRepository
  ) {}

  async execute(): Promise<SantinhoBallotPopulated> {
    const ballot = await this.santinhoRepository.get();
    const sel = ballot.selections || {};

    const [
      deputadoFederal,
      deputadoEstadual,
      senador1,
      senador2,
      governador,
      presidente,
    ] = await Promise.all([
      sel.deputadoFederalId ? this.candidateRepository.findById(sel.deputadoFederalId) : Promise.resolve(null),
      sel.deputadoEstadualId ? this.candidateRepository.findById(sel.deputadoEstadualId) : Promise.resolve(null),
      sel.senador1Id ? this.candidateRepository.findById(sel.senador1Id) : Promise.resolve(null),
      sel.senador2Id ? this.candidateRepository.findById(sel.senador2Id) : Promise.resolve(null),
      sel.governadorId ? this.candidateRepository.findById(sel.governadorId) : Promise.resolve(null),
      sel.presidenteId ? this.candidateRepository.findById(sel.presidenteId) : Promise.resolve(null),
    ]);

    return {
      id: ballot.id,
      ultimaAtualizacao: ballot.ultimaAtualizacao,
      deputadoFederal: deputadoFederal || null,
      deputadoEstadual: deputadoEstadual || null,
      senador1: senador1 || null,
      senador2: senador2 || null,
      governador: governador || null,
      presidente: presidente || null,
    };
  }
}
