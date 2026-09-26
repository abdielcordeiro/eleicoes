import { SantinhoBallot, SantinhoBallotSelections } from '../entities/SantinhoBallot.js';

export interface ISantinhoRepository {
  get(): Promise<SantinhoBallot>;
  save(selections: SantinhoBallotSelections): Promise<SantinhoBallot>;
}
