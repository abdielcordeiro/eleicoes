import { defineStore } from 'pinia';
import { ref } from 'vue';
import { SyncMetadata, SyncResult } from '../domain/models.js';
import { politicalApi } from '../services/api.js';
import { useCandidatesStore } from './candidates.js';
import { usePollsStore } from './polls.js';
import { useSantinhoStore } from './santinho.js';

export const useSyncStore = defineStore('sync', () => {
  const metadata = ref<SyncMetadata>({
    lastSync: new Date().toISOString(),
    lastSyncAt: 'Carregando...',
    formattedDate: 'Carregando...',
    sourcesChecked: [],
    sources: ['TSE', 'Câmara', 'Senado', 'Institutos Registrados'],
    status: 'IDLE',
    recordsUpdated: 0,
  });

  const isSyncing = ref(false);
  const syncSuccessMessage = ref<string | null>(null);
  const syncErrorMessage = ref<string | null>(null);

  async function fetchStatus() {
    try {
      const data = await politicalApi.getSyncStatus();
      metadata.value = data;
    } catch (err: any) {
      console.error('Erro ao buscar status de sincronização:', err);
    }
  }

  async function triggerSync(): Promise<SyncResult | null> {
    isSyncing.value = true;
    syncSuccessMessage.value = null;
    syncErrorMessage.value = null;
    try {
      const result = await politicalApi.triggerSync();
      metadata.value = {
        lastSync: result.timestamp,
        lastSyncAt: result.lastSyncAt || result.formattedTimestamp,
        formattedDate: result.lastSyncAt || result.formattedTimestamp,
        sourcesChecked: result.sourcesChecked || [],
        sources: result.sources,
        status: 'SUCCESS',
        recordsUpdated: result.recordsUpdated,
        details: result.message,
      };

      // Automatically reload Pinia stores without requiring page refresh (F5)
      const candidatesStore = useCandidatesStore();
      const pollsStore = usePollsStore();
      const santinhoStore = useSantinhoStore();

      await Promise.allSettled([
        candidatesStore.fetchCandidates(),
        pollsStore.fetchPolls(pollsStore.selectedRole),
        santinhoStore.fetchSantinho(),
      ]);

      syncSuccessMessage.value = `Base sincronizada com sucesso em ${metadata.value.lastSyncAt}! (${result.recordsUpdated} registros auditados)`;
      setTimeout(() => {
        syncSuccessMessage.value = null;
      }, 5000);
      return result;
    } catch (err: any) {
      syncErrorMessage.value = 'Falha ao sincronizar dados com fontes externas: ' + err.message;
      setTimeout(() => {
        syncErrorMessage.value = null;
      }, 6000);
      return null;
    } finally {
      isSyncing.value = false;
    }
  }

  return {
    metadata,
    isSyncing,
    syncSuccessMessage,
    syncErrorMessage,
    fetchStatus,
    triggerSync,
  };
});
