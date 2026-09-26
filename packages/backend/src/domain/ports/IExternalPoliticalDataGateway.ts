export interface SourceCheckResult {
  name: string;
  url: string;
  status: number | string;
  ok: boolean;
  message?: string;
}

export interface SyncResult {
  timestamp: string; // ISO format
  lastSyncAt: string; // 'DD/MM/AAAA às HH:MM:SS'
  formattedTimestamp: string;
  sourcesChecked: SourceCheckResult[];
  sources: string[];
  recordsUpdated: number;
  message: string;
}

export interface IExternalPoliticalDataGateway {
  syncAll(): Promise<SyncResult>;
}
