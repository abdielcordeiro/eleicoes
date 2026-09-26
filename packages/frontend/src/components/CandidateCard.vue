<template>
  <div
    class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
    :class="{ 'ring-2 ring-vibrant-orange': isSelected }"
  >
    <!-- Top Image & Quick Info -->
    <div>
      <div class="relative h-44 bg-slate-100 overflow-hidden">
        <CandidatePhoto
          :candidate="candidate"
          class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
        />

        <!-- Urna Number Highlight (Laranja Vibrante) -->
        <div class="absolute top-3 right-3 bg-vibrant-orange text-white font-mono font-black text-lg px-3 py-1 rounded-xl shadow-md border border-white/20">
          {{ candidate.numeroUrna }}
        </div>

        <!-- Party badge -->
        <div class="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: candidate.partido.corHex }"></span>
          <span>{{ candidate.partido.sigla }}</span>
        </div>

        <!-- Baseline badge if applicable -->
        <div
          v-if="candidate.isBaselineReference"
          class="absolute top-3 left-3 bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shadow"
        >
          Baseline
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-5">
        <div class="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 class="text-lg font-extrabold text-slate-900 leading-snug">
              {{ candidate.nomeUrna }}
            </h3>
            <span class="text-xs text-slate-500 block truncate max-w-[200px]">
              {{ candidate.partido.nome }}
            </span>
          </div>

          <span
            class="text-[10px] font-bold px-2 py-0.5 rounded-full"
            :class="candidate.termometroAlinhamento.scoreGeral >= 70 ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-700'"
          >
            {{ candidate.termometroAlinhamento.scoreGeral }}% Alinhado
          </span>
        </div>

        <p class="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {{ candidate.resumoPerfil }}
        </p>

        <!-- Pillars Summary Pills -->
        <div class="space-y-1.5 mb-4 pt-3 border-t border-slate-100">
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-500 flex items-center gap-1">🛡️ Segurança</span>
            <span class="font-bold text-slate-800">{{ candidate.pilares.SEGURANCA_PUBLICA?.score || 0 }}/10</span>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-500 flex items-center gap-1">💰 Gastos</span>
            <span class="font-bold text-slate-800">{{ candidate.pilares.GASTOS_PUBLICOS?.score || 0 }}/10</span>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-500 flex items-center gap-1">🏛️ Tam. Estado</span>
            <span class="font-bold text-slate-800">{{ candidate.pilares.TAMANHO_DO_ESTADO?.score || 0 }}/10</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
      <router-link
        :to="`/candidato/${candidate.id}`"
        class="text-xs font-bold text-slate-700 hover:text-vibrant-orange transition-colors flex items-center gap-1"
      >
        <span>Ver Dossiê</span>
        <span>→</span>
      </router-link>

      <!-- Checkbox / Button to include in Santinho -->
      <button
        @click="santinhoStore.toggleCandidate(candidate)"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
        :class="isSelected ? 'bg-vibrant-orange text-white shadow-sm' : 'bg-white border border-slate-300 text-slate-700 hover:border-orange-400'"
      >
        <input
          type="checkbox"
          :checked="isSelected"
          class="accent-vibrant-orange rounded pointer-events-none"
        />
        <span>{{ isSelected ? 'No Meu Santinho' : 'Incluir Santinho' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Candidate } from '../domain/models.js';
import { useSantinhoStore } from '../stores/santinho.js';
import CandidatePhoto from './CandidatePhoto.vue';

const props = defineProps<{
  candidate: Candidate;
}>();

const santinhoStore = useSantinhoStore();

const isSelected = computed(() => santinhoStore.isCandidateSelected(props.candidate.id));
</script>
