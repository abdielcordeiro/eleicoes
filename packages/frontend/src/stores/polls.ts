import { defineStore } from 'pinia';
import { ref } from 'vue';
import { PollResult, OfficeRole } from '../domain/models.js';
import { politicalApi } from '../services/api.js';

export const usePollsStore = defineStore('polls', () => {
  const polls = ref<PollResult[]>([]);
  const currentPoll = ref<PollResult | null>(null);
  const selectedRole = ref<OfficeRole>(OfficeRole.PRESIDENTE);
  const isLoading = ref(false);

  async function fetchPolls(role: OfficeRole = OfficeRole.PRESIDENTE) {
    isLoading.value = true;
    selectedRole.value = role;
    try {
      const data = await politicalApi.getPolls(role);
      polls.value = data;
      currentPoll.value = data.length > 0 ? data[0] : null;
    } catch (err) {
      console.error('Erro ao buscar pesquisas eleitorais:', err);
    } finally {
      isLoading.value = false;
    }
  }

  function setPoll(poll: PollResult) {
    currentPoll.value = poll;
  }

  return {
    polls,
    currentPoll,
    selectedRole,
    isLoading,
    fetchPolls,
    setPoll,
  };
});
