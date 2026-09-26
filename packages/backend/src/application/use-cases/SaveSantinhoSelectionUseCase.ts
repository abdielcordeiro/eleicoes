import { ISantinhoRepository } from '../../domain/ports/ISantinhoRepository.js';
import { SantinhoBallot, SantinhoBallotSelections } from '../../domain/entities/SantinhoBallot.js';

export class SaveSantinhoSelectionUseCase {
  constructor(private santinhoRepository: ISantinhoRepository) {}

  async execute(selections: SantinhoBallotSelections): Promise<SantinhoBallot> {
    return this.santinhoRepository.save(selections);
  }
}
