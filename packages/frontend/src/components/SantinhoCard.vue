<template>
  <div class="space-y-6">
    <!-- Header with Action Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
      <div>
        <h2 class="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>Meu Santinho Eleitoral 2026</span>
          <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-vibrant-orange text-white">
            SP • Urna Oficial
          </span>
        </h2>
        <p class="text-xs text-slate-500 mt-1">
          Ordem estrita de votação da urna eletrônica nas Eleições Gerais de 2026 para o estado de São Paulo.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="printSantinho"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Imprimir / Salvar PDF</span>
        </button>

        <button
          @click="santinhoStore.clearSantinho"
          class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
        >
          <span>Limpar</span>
        </button>
      </div>
    </div>

    <!-- Official Ballot Sheet (Visual Santinho) -->
    <div class="santinho-print-sheet bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-card relative max-w-4xl mx-auto">
      <!-- Watermark / Official Header -->
      <div class="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-end">
        <div>
          <span class="text-[10px] font-black tracking-widest uppercase text-slate-400 block">
            Justiça Eleitoral do Brasil • Eleições Gerais 2026
          </span>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
            Colinha Eleitoral • Estado de São Paulo
          </h1>
        </div>

        <div class="text-right text-[11px] text-slate-500 font-mono">
          <span>Auditado em: {{ formattedDate }}</span>
        </div>
      </div>

      <!-- 6 Urna Positions in exact 2026 Official Order -->
      <div class="space-y-4">
        <!-- 1. Deputado Federal (4 Dígitos) -->
        <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-lg flex items-center justify-center shrink-0">
              1º
            </div>
            <div class="w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
              <CandidatePhoto
                v-if="ballot.deputadoFederal"
                :candidate="ballot.deputadoFederal"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs">
                Vazio
              </div>
            </div>
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                1. Deputado Federal (4 Dígitos)
              </span>
              <strong class="text-base text-slate-900 block leading-tight">
                {{ ballot.deputadoFederal ? ballot.deputadoFederal.nomeUrna : 'Nenhum candidato selecionado' }}
              </strong>
              <span v-if="ballot.deputadoFederal" class="text-xs text-slate-500">
                {{ ballot.deputadoFederal.partido.sigla }} - {{ ballot.deputadoFederal.partido.nome }}
              </span>
            </div>
          </div>

          <div class="flex items-center sm:flex-col sm:items-end justify-between">
            <span class="text-[10px] text-slate-400 uppercase font-mono">Número na Urna</span>
            <div
              class="font-mono font-black text-2xl tracking-widest px-4 py-1.5 rounded-xl border"
              :class="ballot.deputadoFederal ? 'bg-vibrant-orange text-white border-orange-500 shadow-sm' : 'bg-slate-200 text-slate-400 border-slate-300'"
            >
              {{ ballot.deputadoFederal ? ballot.deputadoFederal.numeroUrna : '----' }}
            </div>
          </div>
        </div>

        <!-- 2. Deputado Estadual (5 Dígitos) -->
        <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-lg flex items-center justify-center shrink-0">
              2º
            </div>
            <div class="w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
              <CandidatePhoto
                v-if="ballot.deputadoEstadual"
                :candidate="ballot.deputadoEstadual"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs">
                Vazio
              </div>
            </div>
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                2. Deputado Estadual (5 Dígitos)
              </span>
              <strong class="text-base text-slate-900 block leading-tight">
                {{ ballot.deputadoEstadual ? ballot.deputadoEstadual.nomeUrna : 'Nenhum candidato selecionado' }}
              </strong>
              <span v-if="ballot.deputadoEstadual" class="text-xs text-slate-500">
                {{ ballot.deputadoEstadual.partido.sigla }} - {{ ballot.deputadoEstadual.partido.nome }}
              </span>
            </div>
          </div>

          <div class="flex items-center sm:flex-col sm:items-end justify-between">
            <span class="text-[10px] text-slate-400 uppercase font-mono">Número na Urna</span>
            <div
              class="font-mono font-black text-2xl tracking-widest px-4 py-1.5 rounded-xl border"
              :class="ballot.deputadoEstadual ? 'bg-vibrant-orange text-white border-orange-500 shadow-sm' : 'bg-slate-200 text-slate-400 border-slate-300'"
            >
              {{ ballot.deputadoEstadual ? ballot.deputadoEstadual.numeroUrna : '-----' }}
            </div>
          </div>
        </div>

        <!-- 3. Senador - 1ª Vaga (3 Dígitos) -->
        <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-lg flex items-center justify-center shrink-0">
              3º
            </div>
            <div class="w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
              <CandidatePhoto
                v-if="ballot.senador1"
                :candidate="ballot.senador1"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs">
                Vazio
              </div>
            </div>
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                3. Senador - 1ª Vaga (3 Dígitos)
              </span>
              <strong class="text-base text-slate-900 block leading-tight">
                {{ ballot.senador1 ? ballot.senador1.nomeUrna : 'Nenhum candidato selecionado' }}
              </strong>
              <span v-if="ballot.senador1" class="text-xs text-slate-500">
                {{ ballot.senador1.partido.sigla }} - {{ ballot.senador1.partido.nome }}
              </span>
            </div>
          </div>

          <div class="flex items-center sm:flex-col sm:items-end justify-between">
            <span class="text-[10px] text-slate-400 uppercase font-mono">Número na Urna</span>
            <div
              class="font-mono font-black text-2xl tracking-widest px-4 py-1.5 rounded-xl border"
              :class="ballot.senador1 ? 'bg-vibrant-orange text-white border-orange-500 shadow-sm' : 'bg-slate-200 text-slate-400 border-slate-300'"
            >
              {{ ballot.senador1 ? ballot.senador1.numeroUrna : '---' }}
            </div>
          </div>
        </div>

        <!-- 4. Senador - 2ª Vaga (3 Dígitos) -->
        <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-lg flex items-center justify-center shrink-0">
              4º
            </div>
            <div class="w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
              <CandidatePhoto
                v-if="ballot.senador2"
                :candidate="ballot.senador2"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs">
                Vazio
              </div>
            </div>
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                4. Senador - 2ª Vaga (3 Dígitos)
              </span>
              <strong class="text-base text-slate-900 block leading-tight">
                {{ ballot.senador2 ? ballot.senador2.nomeUrna : 'Nenhum candidato selecionado' }}
              </strong>
              <span v-if="ballot.senador2" class="text-xs text-slate-500">
                {{ ballot.senador2.partido.sigla }} - {{ ballot.senador2.partido.nome }}
              </span>
            </div>
          </div>

          <div class="flex items-center sm:flex-col sm:items-end justify-between">
            <span class="text-[10px] text-slate-400 uppercase font-mono">Número na Urna</span>
            <div
              class="font-mono font-black text-2xl tracking-widest px-4 py-1.5 rounded-xl border"
              :class="ballot.senador2 ? 'bg-vibrant-orange text-white border-orange-500 shadow-sm' : 'bg-slate-200 text-slate-400 border-slate-300'"
            >
              {{ ballot.senador2 ? ballot.senador2.numeroUrna : '---' }}
            </div>
          </div>
        </div>

        <!-- 5. Governador de SP (2 Dígitos) -->
        <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-lg flex items-center justify-center shrink-0">
              5º
            </div>
            <div class="w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
              <CandidatePhoto
                v-if="ballot.governador"
                :candidate="ballot.governador"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs">
                Vazio
              </div>
            </div>
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                5. Governador do Estado de SP (2 Dígitos)
              </span>
              <strong class="text-base text-slate-900 block leading-tight">
                {{ ballot.governador ? ballot.governador.nomeUrna : 'Nenhum candidato selecionado' }}
              </strong>
              <span v-if="ballot.governador" class="text-xs text-slate-500">
                {{ ballot.governador.partido.sigla }} - {{ ballot.governador.partido.nome }}
              </span>
            </div>
          </div>

          <div class="flex items-center sm:flex-col sm:items-end justify-between">
            <span class="text-[10px] text-slate-400 uppercase font-mono">Número na Urna</span>
            <div
              class="font-mono font-black text-2xl tracking-widest px-4 py-1.5 rounded-xl border"
              :class="ballot.governador ? 'bg-vibrant-orange text-white border-orange-500 shadow-sm' : 'bg-slate-200 text-slate-400 border-slate-300'"
            >
              {{ ballot.governador ? ballot.governador.numeroUrna : '--' }}
            </div>
          </div>
        </div>

        <!-- 6. Presidente da República (2 Dígitos) -->
        <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-lg flex items-center justify-center shrink-0">
              6º
            </div>
            <div class="w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
              <CandidatePhoto
                v-if="ballot.presidente"
                :candidate="ballot.presidente"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs">
                Vazio
              </div>
            </div>
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                6. Presidente da República (2 Dígitos)
              </span>
              <strong class="text-base text-slate-900 block leading-tight">
                {{ ballot.presidente ? ballot.presidente.nomeUrna : 'Nenhum candidato selecionado' }}
              </strong>
              <span v-if="ballot.presidente" class="text-xs text-slate-500">
                {{ ballot.presidente.partido.sigla }} - {{ ballot.presidente.partido.nome }}
              </span>
            </div>
          </div>

          <div class="flex items-center sm:flex-col sm:items-end justify-between">
            <span class="text-[10px] text-slate-400 uppercase font-mono">Número na Urna</span>
            <div
              class="font-mono font-black text-2xl tracking-widest px-4 py-1.5 rounded-xl border"
              :class="ballot.presidente ? 'bg-vibrant-orange text-white border-orange-500 shadow-sm' : 'bg-slate-200 text-slate-400 border-slate-300'"
            >
              {{ ballot.presidente ? ballot.presidente.numeroUrna : '--' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Note -->
      <div class="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-400">
        Leve sua colinha impressa para a seção eleitoral. É proibido entrar na cabine de votação com aparelhos celulares ou câmeras.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSantinhoStore } from '../stores/santinho.js';
import CandidatePhoto from './CandidatePhoto.vue';

const santinhoStore = useSantinhoStore();

const ballot = computed(() => santinhoStore.ballot);

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date());
});

function printSantinho() {
  window.print();
}
</script>
