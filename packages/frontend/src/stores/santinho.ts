import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Candidate, OfficeRole, SantinhoBallotPopulated, SantinhoBallotSelections } from '../domain/models.js';
import { politicalApi } from '../services/api.js';

export const useSantinhoStore = defineStore('santinho', () => {
  const ballot = ref<SantinhoBallotPopulated>({
    id: 'meu_santinho_sp_2026',
    ultimaAtualizacao: new Date().toISOString(),
    deputadoFederal: null,
    deputadoEstadual: null,
    senador1: null,
    senador2: null,
    governador: null,
    presidente: null,
  });

  const isLoading = ref(false);
  const isSaving = ref(false);

  const totalSelected = computed(() => {
    let count = 0;
    if (ballot.value.deputadoFederal) count++;
    if (ballot.value.deputadoEstadual) count++;
    if (ballot.value.senador1) count++;
    if (ballot.value.senador2) count++;
    if (ballot.value.governador) count++;
    if (ballot.value.presidente) count++;
    return count;
  });

  async function fetchSantinho() {
    isLoading.value = true;
    try {
      const data = await politicalApi.getSantinho();
      ballot.value = data;
    } catch (err) {
      console.error('Erro ao buscar Meu Santinho:', err);
    } finally {
      isLoading.value = false;
    }
  }

  function isCandidateSelected(candidateId: string): boolean {
    return (
      ballot.value.presidente?.id === candidateId ||
      ballot.value.governador?.id === candidateId ||
      ballot.value.senador1?.id === candidateId ||
      ballot.value.senador2?.id === candidateId ||
      ballot.value.deputadoFederal?.id === candidateId ||
      ballot.value.deputadoEstadual?.id === candidateId
    );
  }

  async function toggleCandidate(candidate: Candidate) {
    const isSelected = isCandidateSelected(candidate.id);
    const selections: SantinhoBallotSelections = {
      presidenteId: ballot.value.presidente?.id || null,
      governadorId: ballot.value.governador?.id || null,
      senador1Id: ballot.value.senador1?.id || null,
      senador2Id: ballot.value.senador2?.id || null,
      deputadoFederalId: ballot.value.deputadoFederal?.id || null,
      deputadoEstadualId: ballot.value.deputadoEstadual?.id || null,
    };

    if (isSelected) {
      // Unselect
      if (candidate.cargo === OfficeRole.PRESIDENTE) selections.presidenteId = null;
      else if (candidate.cargo === OfficeRole.GOVERNADOR_SP) selections.governadorId = null;
      else if (candidate.cargo === OfficeRole.DEPUTADO_FEDERAL_SP) selections.deputadoFederalId = null;
      else if (candidate.cargo === OfficeRole.DEPUTADO_ESTADUAL_SP) selections.deputadoEstadualId = null;
      else if (candidate.cargo === OfficeRole.SENADOR_SP) {
        if (selections.senador1Id === candidate.id) {
          selections.senador1Id = selections.senador2Id;
          selections.senador2Id = null;
        } else if (selections.senador2Id === candidate.id) {
          selections.senador2Id = null;
        }
      }
    } else {
      // Select
      if (candidate.cargo === OfficeRole.PRESIDENTE) selections.presidenteId = candidate.id;
      else if (candidate.cargo === OfficeRole.GOVERNADOR_SP) selections.governadorId = candidate.id;
      else if (candidate.cargo === OfficeRole.DEPUTADO_FEDERAL_SP) selections.deputadoFederalId = candidate.id;
      else if (candidate.cargo === OfficeRole.DEPUTADO_ESTADUAL_SP) selections.deputadoEstadualId = candidate.id;
      else if (candidate.cargo === OfficeRole.SENADOR_SP) {
        // 2 Senate seats in 2026!
        if (!selections.senador1Id) {
          selections.senador1Id = candidate.id;
        } else if (!selections.senador2Id) {
          selections.senador2Id = candidate.id;
        } else {
          // Replace second seat
          selections.senador2Id = candidate.id;
        }
      }
    }

    isSaving.value = true;
    try {
      const updated = await politicalApi.saveSantinho(selections);
      ballot.value = updated;
    } catch (err) {
      console.error('Erro ao salvar seleção no Santinho:', err);
    } finally {
      isSaving.value = false;
    }
  }

  async function clearSantinho() {
    isSaving.value = true;
    try {
      const emptySelections: SantinhoBallotSelections = {
        presidenteId: null,
        governadorId: null,
        senador1Id: null,
        senador2Id: null,
        deputadoFederalId: null,
        deputadoEstadualId: null,
      };
      const updated = await politicalApi.saveSantinho(emptySelections);
      ballot.value = updated;
    } catch (err) {
      console.error('Erro ao limpar Santinho:', err);
    } finally {
      isSaving.value = false;
    }
  }

  return {
    ballot,
    isLoading,
    isSaving,
    totalSelected,
    fetchSantinho,
    isCandidateSelected,
    toggleCandidate,
    clearSantinho,
  };
});
