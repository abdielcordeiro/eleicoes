import axios from 'axios';
import {
  Candidate,
  ComparisonMatrixOutput,
  OfficeRole,
  PollResult,
  SantinhoBallotPopulated,
  SantinhoBallotSelections,
  SyncMetadata,
  SyncResult,
} from '../domain/models.js';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const politicalApi = {
  async getCandidates(role?: OfficeRole): Promise<Candidate[]> {
    const params = role ? { role } : undefined;
    const response = await api.get<Candidate[]>('/candidates', { params });
    return response.data;
  },

  async getCandidateById(id: string): Promise<Candidate> {
    const response = await api.get<Candidate>(`/candidates/${id}`);
    return response.data;
  },

  async getComparison(role: OfficeRole = OfficeRole.PRESIDENTE, ids?: string[]): Promise<ComparisonMatrixOutput> {
    const params: Record<string, string> = { role };
    if (ids && ids.length > 0) {
      params.ids = ids.join(',');
    }
    const response = await api.get<ComparisonMatrixOutput>('/compare', { params });
    return response.data;
  },

  async getPolls(role?: OfficeRole): Promise<PollResult[]> {
    const params = role ? { role } : undefined;
    const response = await api.get<PollResult[]>('/polls', { params });
    return response.data;
  },

  async triggerSync(): Promise<SyncResult> {
    const response = await api.post<SyncResult>('/sync');
    return response.data;
  },

  async getSyncStatus(): Promise<SyncMetadata> {
    const response = await api.get<SyncMetadata>('/sync/status');
    return response.data;
  },

  async getSantinho(): Promise<SantinhoBallotPopulated> {
    const response = await api.get<SantinhoBallotPopulated>('/santinho');
    return response.data;
  },

  async saveSantinho(selections: SantinhoBallotSelections): Promise<SantinhoBallotPopulated> {
    const response = await api.post<SantinhoBallotPopulated>('/santinho', selections);
    return response.data;
  },
};
