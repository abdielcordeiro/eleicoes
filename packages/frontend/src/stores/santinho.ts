import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Candidate, OfficeRole, SantinhoBallotPopulated } from '../domain/models.js';
import { santinhoStorage, createEmptyBallot } from '../services/santinhoStorage.js';

export const useSantinhoStore = defineStore('santinho', () => {
  // Inicializa obrigatoriamente a partir do localStorage ou EM BRANCO por padrão
  const ballot = ref<SantinhoBallotPopulated>(santinhoStorage.load());

  const isLoading = ref(false);
  const isSaving = ref(false);
  const lastActionMessage = ref<string | null>(null);
  let actionTimeout: ReturnType<typeof setTimeout> | null = null;

  function setActionFeedback(msg: string) {
    lastActionMessage.value = msg;
    if (actionTimeout) clearTimeout(actionTimeout);
    actionTimeout = setTimeout(() => {
      lastActionMessage.value = null;
    }, 3500);
  }

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
      // Leitura síncrona, segura e estritamente local (Privacy by Design / LGPD)
      ballot.value = santinhoStorage.load();
    } catch (err) {
      console.warn('Erro ao carregar Meu Santinho do armazenamento local:', err);
      ballot.value = createEmptyBallot();
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

  function toggleCandidate(candidate: Candidate) {
    const isSelected = isCandidateSelected(candidate.id);

    if (isSelected) {
      // Desmarcar candidato
      if (ballot.value.presidente?.id === candidate.id) ballot.value.presidente = null;
      else if (ballot.value.governador?.id === candidate.id) ballot.value.governador = null;
      else if (ballot.value.deputadoFederal?.id === candidate.id) ballot.value.deputadoFederal = null;
      else if (ballot.value.deputadoEstadual?.id === candidate.id) ballot.value.deputadoEstadual = null;
      else if (ballot.value.senador1?.id === candidate.id) {
        ballot.value.senador1 = ballot.value.senador2;
        ballot.value.senador2 = null;
      } else if (ballot.value.senador2?.id === candidate.id) {
        ballot.value.senador2 = null;
      }
      setActionFeedback(`Removido do Santinho: ${candidate.nomeUrna}`);
    } else {
      // Selecionar candidato para sua vaga específica
      if (candidate.cargo === OfficeRole.PRESIDENTE) {
        ballot.value.presidente = candidate;
      } else if (candidate.cargo === OfficeRole.GOVERNADOR_SP) {
        ballot.value.governador = candidate;
      } else if (candidate.cargo === OfficeRole.DEPUTADO_FEDERAL_SP) {
        ballot.value.deputadoFederal = candidate;
      } else if (candidate.cargo === OfficeRole.DEPUTADO_ESTADUAL_SP) {
        ballot.value.deputadoEstadual = candidate;
      } else if (candidate.cargo === OfficeRole.SENADOR_SP) {
        // Eleições 2026: 2 Vagas para o Senado Federal por SP
        if (!ballot.value.senador1) {
          ballot.value.senador1 = candidate;
        } else if (!ballot.value.senador2) {
          ballot.value.senador2 = candidate;
        } else {
          // Substitui a 2ª vaga caso ambas já estejam preenchidas
          ballot.value.senador2 = candidate;
        }
      }
      setActionFeedback(`✓ Adicionado ao Santinho: ${candidate.nomeUrna} (${candidate.numeroUrna})`);
    }

    ballot.value.ultimaAtualizacao = new Date().toISOString();
    // Persistência imediata 100% no localStorage do navegador do usuário
    santinhoStorage.save(ballot.value);
  }

  function clearSantinho() {
    ballot.value = santinhoStorage.clear();
    setActionFeedback('Santinho reinicializado. Todas as vagas estão em branco.');
  }

  return {
    ballot,
    isLoading,
    isSaving,
    lastActionMessage,
    totalSelected,
    fetchSantinho,
    isCandidateSelected,
    toggleCandidate,
    clearSantinho,
  };
});
