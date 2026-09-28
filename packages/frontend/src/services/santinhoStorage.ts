import { Candidate, OfficeRole, SantinhoBallotPopulated } from '../domain/models.js';

const STORAGE_KEY = 'voto_consciente_santinho_2026';

export function createEmptyBallot(): SantinhoBallotPopulated {
  return {
    id: 'meu_santinho_sp_2026',
    ultimaAtualizacao: new Date().toISOString(),
    deputadoFederal: null,
    deputadoEstadual: null,
    senador1: null,
    senador2: null,
    governador: null,
    presidente: null,
  };
}

export const santinhoStorage = {
  load(): SantinhoBallotPopulated {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return createEmptyBallot();
      }
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return createEmptyBallot();
      }
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          id: parsed.id || 'meu_santinho_sp_2026',
          ultimaAtualizacao: parsed.ultimaAtualizacao || new Date().toISOString(),
          deputadoFederal: parsed.deputadoFederal || null,
          deputadoEstadual: parsed.deputadoEstadual || null,
          senador1: parsed.senador1 || null,
          senador2: parsed.senador2 || null,
          governador: parsed.governador || null,
          presidente: parsed.presidente || null,
        };
      }
      return createEmptyBallot();
    } catch (err) {
      console.warn('Falha ao ler Santinho do localStorage. Inicializando em branco:', err);
      return createEmptyBallot();
    }
  },

  save(ballot: SantinhoBallotPopulated): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ballot));
      }
    } catch (err) {
      console.error('Falha ao gravar Santinho no localStorage:', err);
    }
  },

  clear(): SantinhoBallotPopulated {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      console.error('Falha ao limpar Santinho do localStorage:', err);
    }
    return createEmptyBallot();
  },
};
