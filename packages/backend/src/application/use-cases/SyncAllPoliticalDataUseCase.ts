import { IExternalPoliticalDataGateway, SyncResult } from '../../domain/ports/IExternalPoliticalDataGateway.js';

export class SyncAllPoliticalDataUseCase {
  constructor(private gateway: IExternalPoliticalDataGateway) {}

  async execute(): Promise<SyncResult> {
    return this.gateway.syncAll();
  }
}
