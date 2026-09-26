export interface SyncResult {
  timestamp: string; // ISO format
  formattedTimestamp: string;
  sources: string[];
  recordsUpdated: number;
  message: string;
}

export interface IExternalPoliticalDataGateway {
  syncAll(): Promise<SyncResult>;
}
