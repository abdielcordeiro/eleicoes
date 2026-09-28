<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full no-print">
    <!-- Success Toast -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="syncStore.syncSuccessMessage"
        class="bg-emerald-900 text-white p-4 rounded-xl shadow-lg border border-emerald-700 flex items-start gap-3"
      >
        <span class="text-emerald-300 mt-0.5">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <div class="flex-1 text-xs">
          <strong class="block font-bold text-sm text-emerald-100 mb-0.5">Sincronização Concluída</strong>
          <span>{{ syncStore.syncSuccessMessage }}</span>
        </div>
      </div>
    </transition>

    <!-- Error Toast -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="syncStore.syncErrorMessage"
        class="bg-red-900 text-white p-4 rounded-xl shadow-lg border border-red-700 flex items-start gap-3"
      >
        <span class="text-red-300 mt-0.5">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </span>
        <div class="flex-1 text-xs">
          <strong class="block font-bold text-sm text-red-100 mb-0.5">Aviso de Sincronização</strong>
          <span>{{ syncStore.syncErrorMessage }}</span>
        </div>
      </div>
    </transition>
    <!-- Santinho Toast Feedback -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="santinhoStore.lastActionMessage"
        class="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-700 flex items-center gap-3"
      >
        <span class="p-1.5 rounded-lg bg-vibrant-orange text-white shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </span>
        <div class="flex-1 text-xs">
          <strong class="block font-bold text-xs text-white mb-0.5">Meu Santinho Digital (Local)</strong>
          <span class="text-slate-200">{{ santinhoStore.lastActionMessage }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useSyncStore } from '../stores/sync.js';
import { useSantinhoStore } from '../stores/santinho.js';

const syncStore = useSyncStore();
const santinhoStore = useSantinhoStore();
</script>
