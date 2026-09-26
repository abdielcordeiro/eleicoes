<template>
  <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card">
    <div class="p-6 border-b border-slate-200 bg-slate-50/50">
      <div class="flex items-center gap-2">
        <span class="p-1.5 rounded-lg bg-blue-100 text-blue-700">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </span>
        <div>
          <h3 class="text-lg font-extrabold text-slate-900">Histórico de Votações Legislativas (PLs & PECs)</h3>
          <p class="text-xs text-slate-500">Posicionamentos registrados em matérias cruciais no Congresso Nacional / Assembleia.</p>
        </div>
      </div>
    </div>

    <div v-if="votes.length === 0" class="p-8 text-center text-slate-400 text-sm">
      Nenhuma votação legislativa direta registrada para este candidato no período recente.
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <th class="p-4 w-36">Projeto / Código</th>
            <th class="p-4 w-48">Tema</th>
            <th class="p-4">Ementa & Impacto</th>
            <th class="p-4 w-28 text-center">Data</th>
            <th class="p-4 w-28 text-center">Como Votou</th>
            <th class="p-4 w-28 text-center">Fonte Oficial</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-xs">
          <tr v-for="vote in votes" :key="vote.id" class="hover:bg-slate-50/60 transition-colors">
            <!-- Projeto Código -->
            <td class="p-4 font-mono font-bold text-slate-900 whitespace-nowrap">
              {{ vote.projetoCodigo }}
            </td>

            <!-- Tema -->
            <td class="p-4 font-semibold text-slate-800">
              <span class="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {{ vote.tema }}
              </span>
            </td>

            <!-- Ementa & Impacto -->
            <td class="p-4">
              <p class="font-medium text-slate-800 leading-snug mb-1">{{ vote.ementa }}</p>
              <p class="text-[11px] text-slate-500">{{ vote.descricaoImpacto }}</p>
            </td>

            <!-- Data -->
            <td class="p-4 text-center text-slate-600 whitespace-nowrap">
              {{ vote.data }}
            </td>

            <!-- Voto -->
            <td class="p-4 text-center whitespace-nowrap">
              <span
                class="px-2.5 py-1 rounded-full font-black text-xs inline-block"
                :class="{
                  'bg-emerald-100 text-emerald-800 border border-emerald-300': vote.voto === 'SIM',
                  'bg-red-100 text-red-800 border border-red-300': vote.voto === 'NAO',
                  'bg-amber-100 text-amber-800 border border-amber-300': vote.voto === 'ABSTENCAO' || vote.voto === 'OBSTRUCAO',
                  'bg-slate-100 text-slate-700 border border-slate-300': vote.voto === 'AUSENTE'
                }"
              >
                {{ vote.voto }}
              </span>
            </td>

            <!-- Fonte Oficial Link -->
            <td class="p-4 text-center whitespace-nowrap">
              <a
                :href="vote.linkOficial"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-xs font-bold text-vibrant-orange hover:underline"
              >
                <span>Ver Tramitação</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LegislativeVote } from '../domain/models.js';

defineProps<{
  votes: LegislativeVote[];
}>();
</script>
