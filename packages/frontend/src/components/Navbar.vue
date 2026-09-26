<template>
  <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm no-print">
    <!-- Top banner with Sync status and Sync Button -->
    <div class="bg-slate-900 text-slate-100 text-xs py-2 px-4">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Dados Auditados
          </span>
          <span class="text-slate-300">
            Última atualização: <strong class="text-white">{{ syncStore.metadata.lastSyncAt || syncStore.metadata.formattedDate }}</strong> —
            <span class="text-slate-400">Fontes: TSE / Câmara / Senado / Wikipédia / Institutos Registrados</span>
          </span>
        </div>

        <button
          @click="handleSync"
          :disabled="syncStore.isSyncing"
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md font-semibold text-xs text-white bg-vibrant-orange hover:bg-vibrant-orange-hover transition-all transform active:scale-95 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg
            :class="{ 'animate-spin': syncStore.isSyncing }"
            class="w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{{ syncStore.isSyncing ? 'Consultando API da Câmara, Senado, Wikipédia e Pesquisas...' : '🔄 Buscar e Atualizar Dados' }}</span>
        </button>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo / Brand -->
        <router-link to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-lg bg-vibrant-orange flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
            VC
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-extrabold text-lg tracking-tight text-slate-900">VotoConsciente</span>
              <span class="px-1.5 py-0.5 rounded text-[11px] font-bold bg-vibrant-orange-light text-vibrant-orange border border-orange-200">2026 SP</span>
            </div>
            <p class="text-xs text-slate-500 font-medium hidden sm:block">Analisador Político & Santinho Digital Auditável</p>
          </div>
        </router-link>

        <!-- Navigation Links -->
        <nav class="flex items-center gap-1 sm:gap-2">
          <router-link
            to="/"
            class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="$route.path === '/' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'"
          >
            Comparativo Geral
          </router-link>

          <!-- Dropdown or Direct Link for Cargos -->
          <router-link
            to="/cargos"
            class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="$route.path.startsWith('/cargos') ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'"
          >
            Cargos em Disputa
          </router-link>

          <!-- Santinho Link with Badge -->
          <router-link
            to="/santinho"
            class="ml-2 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold border transition-all"
            :class="$route.path === '/santinho' ? 'bg-vibrant-orange text-white border-vibrant-orange shadow-sm' : 'border-orange-300 bg-orange-50 text-orange-950 hover:bg-orange-100'"
          >
            <span>Meu Santinho</span>
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
              :class="$route.path === '/santinho' ? 'bg-white text-vibrant-orange' : 'bg-vibrant-orange text-white'"
            >
              {{ santinhoStore.totalSelected }}
            </span>
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSyncStore } from '../stores/sync.js';
import { useSantinhoStore } from '../stores/santinho.js';

const syncStore = useSyncStore();
const santinhoStore = useSantinhoStore();

onMounted(async () => {
  await Promise.all([
    syncStore.fetchStatus(),
    santinhoStore.fetchSantinho(),
  ]);
});

async function handleSync() {
  await syncStore.triggerSync();
}
</script>
