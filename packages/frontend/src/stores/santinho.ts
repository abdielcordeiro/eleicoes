import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Candidate, OfficeRole, SantinhoBallotPopulated } from '../domain/models.js';
import { santinhoStorage, createEmptyBallot } from '../services/santinhoStorage.js';

export type BallotSlotKey =
  | 'presidente'
  | 'governador'
  | 'senador1'
  | 'senador2'
  | 'deputadoFederal'
  | 'deputadoEstadual';

export const useSantinhoStore = defineStore('santinho', () => {
  // Inicializa obrigatoriamente a partir do localStorage ou EM BRANCO por padrão (Privacy by Design)
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
      ballot.value = santinhoStorage.load();
    } catch (err) {
      console.warn('Erro ao carregar Meu Santinho do armazenamento local:', err);
      ballot.value = createEmptyBallot();
    } finally {
      isLoading.value = false;
    }
  }

  function getCandidateSlot(candidateId: string): BallotSlotKey | null {
    if (ballot.value.presidente?.id === candidateId) return 'presidente';
    if (ballot.value.governador?.id === candidateId) return 'governador';
    if (ballot.value.senador1?.id === candidateId) return 'senador1';
    if (ballot.value.senador2?.id === candidateId) return 'senador2';
    if (ballot.value.deputadoFederal?.id === candidateId) return 'deputadoFederal';
    if (ballot.value.deputadoEstadual?.id === candidateId) return 'deputadoEstadual';
    return null;
  }

  function isCandidateSelected(candidateId: string): boolean {
    return getCandidateSlot(candidateId) !== null;
  }

  function getSenatorSlot(candidateId: string): 1 | 2 | null {
    if (ballot.value.senador1?.id === candidateId) return 1;
    if (ballot.value.senador2?.id === candidateId) return 2;
    return null;
  }

  function removeSlot(slot: BallotSlotKey) {
    const candidateName = ballot.value[slot]?.nomeUrna || 'Candidato';
    ballot.value[slot] = null;
    ballot.value.ultimaAtualizacao = new Date().toISOString();
    santinhoStorage.save(ballot.value);

    const slotNames: Record<BallotSlotKey, string> = {
      deputadoFederal: 'Deputado Federal',
      deputadoEstadual: 'Deputado Estadual',
      senador1: 'Senador (1ª Vaga)',
      senador2: 'Senador (2ª Vaga)',
      governador: 'Governador de SP',
      presidente: 'Presidente da República',
    };

    setActionFeedback(`Removido: ${candidateName} (${slotNames[slot]})`);
  }

  function assignSenator(candidate: Candidate, targetSlot: 'senador1' | 'senador2') {
    const currentSlot = getSenatorSlot(candidate.id);

    if (currentSlot === 1 && targetSlot === 'senador1') {
      // Se já está na 1ª e clicou na 1ª, remove
      removeSlot('senador1');
      return;
    }
    if (currentSlot === 2 && targetSlot === 'senador2') {
      // Se já está na 2ª e clicou na 2ª, remove
      removeSlot('senador2');
      return;
    }

    if (targetSlot === 'senador1') {
      if (currentSlot === 2) {
        // Estava na 2ª e foi para a 1ª: limpa a 2ª vaga
        ballot.value.senador2 = null;
      }
      ballot.value.senador1 = candidate;
      setActionFeedback(`✓ ${candidate.nomeUrna} definido para a 1ª Vaga no Senado!`);
    } else {
      if (currentSlot === 1) {
        // Estava na 1ª e foi para a 2ª: limpa a 1ª vaga
        ballot.value.senador1 = null;
      }
      ballot.value.senador2 = candidate;
      setActionFeedback(`✓ ${candidate.nomeUrna} definido para a 2ª Vaga no Senado!`);
    }

    ballot.value.ultimaAtualizacao = new Date().toISOString();
    santinhoStorage.save(ballot.value);
  }

  function toggleCandidate(candidate: Candidate, preferredSenatorSlot?: 'senador1' | 'senador2') {
    const slot = getCandidateSlot(candidate.id);

    if (candidate.cargo === OfficeRole.SENADOR_SP) {
      if (preferredSenatorSlot) {
        assignSenator(candidate, preferredSenatorSlot);
        return;
      }

      if (slot === 'senador1') {
        removeSlot('senador1');
      } else if (slot === 'senador2') {
        removeSlot('senador2');
      } else {
        // Não está selecionado: preenche a 1ª vaga se vaga, senão a 2ª vaga
        if (!ballot.value.senador1) {
          assignSenator(candidate, 'senador1');
        } else if (!ballot.value.senador2) {
          assignSenator(candidate, 'senador2');
        } else {
          // Ambas cheias: substitui a 2ª vaga por padrão com feedback claro
          assignSenator(candidate, 'senador2');
        }
      }
      return;
    }

    // Cargos de vaga única
    if (slot) {
      removeSlot(slot);
    } else {
      if (candidate.cargo === OfficeRole.PRESIDENTE) {
        ballot.value.presidente = candidate;
        setActionFeedback(`✓ Definido para Presidente: ${candidate.nomeUrna} (${candidate.numeroUrna})`);
      } else if (candidate.cargo === OfficeRole.GOVERNADOR_SP) {
        ballot.value.governador = candidate;
        setActionFeedback(`✓ Definido para Governador: ${candidate.nomeUrna} (${candidate.numeroUrna})`);
      } else if (candidate.cargo === OfficeRole.DEPUTADO_FEDERAL_SP) {
        ballot.value.deputadoFederal = candidate;
        setActionFeedback(`✓ Definido para Deputado Federal: ${candidate.nomeUrna} (${candidate.numeroUrna})`);
      } else if (candidate.cargo === OfficeRole.DEPUTADO_ESTADUAL_SP) {
        ballot.value.deputadoEstadual = candidate;
        setActionFeedback(`✓ Definido para Deputado Estadual: ${candidate.nomeUrna} (${candidate.numeroUrna})`);
      }

      ballot.value.ultimaAtualizacao = new Date().toISOString();
      santinhoStorage.save(ballot.value);
    }
  }

  function clearSantinho() {
    ballot.value = santinhoStorage.clear();
    setActionFeedback('Santinho reinicializado. Todas as 6 vagas estão em branco.');
  }

  return {
    ballot,
    isLoading,
    isSaving,
    lastActionMessage,
    totalSelected,
    fetchSantinho,
    isCandidateSelected,
    getCandidateSlot,
    getSenatorSlot,
    removeSlot,
    assignSenator,
    toggleCandidate,
    clearSantinho,
  };
});
