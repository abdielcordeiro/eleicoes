import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Candidate, OfficeRole, ComparisonMatrixOutput } from '../domain/models.js';
import { politicalApi } from '../services/api.js';

export const useCandidatesStore = defineStore('candidates', () => {
  const candidates = ref<Candidate[]>([]);
  const currentCandidate = ref<Candidate | null>(null);
  const comparisonMatrix = ref<ComparisonMatrixOutput | null>(null);
  const isLoading = ref(false);
  const selectedRole = ref<OfficeRole | null>(null);

  async function fetchCandidates(role?: OfficeRole) {
    isLoading.value = true;
    try {
      selectedRole.value = role || null;
      candidates.value = await politicalApi.getCandidates(role);
    } catch (err) {
      console.error('Erro ao buscar candidatos:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchCandidateById(id: string): Promise<Candidate | null> {
    isLoading.value = true;
    try {
      const data = await politicalApi.getCandidateById(id);
      currentCandidate.value = data;
      return data;
    } catch (err) {
      console.error(`Erro ao buscar candidato ${id}:`, err);
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchComparison(role: OfficeRole = OfficeRole.PRESIDENTE, ids?: string[]) {
    isLoading.value = true;
    try {
      comparisonMatrix.value = await politicalApi.getComparison(role, ids);
    } catch (err) {
      console.error('Erro ao buscar comparativo:', err);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    candidates,
    currentCandidate,
    comparisonMatrix,
    isLoading,
    selectedRole,
    fetchCandidates,
    fetchCandidateById,
    fetchComparison,
  };
});
