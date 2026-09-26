<template>
  <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card">
    <!-- Header -->
    <div class="p-6 border-b border-slate-200 bg-slate-50/50">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="p-1.5 rounded-lg bg-amber-100 text-amber-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </span>
          <div>
            <h3 class="text-lg font-extrabold text-slate-900 tracking-tight">
              Raio-X de Escândalos, Processos e Ficha Limpa
            </h3>
            <p class="text-xs text-slate-500">
              Módulo crítico de transparência processual com diferenciação estrita entre Mérito e Vício Formal.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 text-xs">
          <span class="px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            Absolvição no Mérito
          </span>
          <span class="px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-900 border border-amber-300">
            Vício Formal / Anulação
          </span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="records.length === 0" class="p-10 text-center">
      <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h4 class="text-base font-bold text-slate-900">Nenhum Registro de Escândalo ou Processo Encontrado</h4>
      <p class="text-xs text-slate-500 max-w-md mx-auto mt-1">
        Não constam inquéritos em tribunais superiores, condenações penais ou ações civis públicas ativas contra este candidato na base auditada.
      </p>
    </div>

    <!-- 3-Columns Critical Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
            <th class="p-4 w-1/3 min-w-[280px]">
              1. O Caso e a Fonte
            </th>
            <th class="p-4 w-1/3 min-w-[280px] border-x border-slate-200">
              2. O que Apontavam as Provas / Investigações
            </th>
            <th class="p-4 w-1/3 min-w-[300px]">
              3. Situação Real e Desfecho Jurídico
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 text-xs">
          <tr v-for="record in records" :key="record.id" class="align-top hover:bg-slate-50/50 transition-colors">
            <!-- COLUNA 1: O Caso e a Fonte -->
            <td class="p-5">
              <div class="flex items-start gap-2 mb-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {{ record.tribunalOuOrgao }}
                </span>
                <span v-if="record.numeroProcessoOuInquerito" class="text-[10px] text-slate-400 font-mono">
                  {{ record.numeroProcessoOuInquerito }}
                </span>
              </div>

              <h4 class="font-extrabold text-sm text-slate-900 mb-2 leading-tight">
                {{ record.tituloCaso }}
              </h4>

              <p class="text-slate-600 leading-relaxed mb-3">
                {{ record.resumoCaso }}
              </p>

              <a
                :href="record.linkFonte"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 font-bold text-vibrant-orange hover:underline text-[11px]"
              >
                <span>Acessar Fonte / Decisão Judicial</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </td>

            <!-- COLUNA 2: O que apontavam as Provas / Investigações -->
            <td class="p-5 border-x border-slate-200 bg-slate-50/30">
              <p class="text-slate-700 leading-relaxed font-normal">
                {{ record.elementosInvestigacaoEProvas }}
              </p>
            </td>

            <!-- COLUNA 3: Situação Real e Desfecho Jurídico -->
            <td class="p-5" :class="getDesfechoBg(record.status)">
              <div class="mb-3">
                <span
                  class="inline-block px-3 py-1 rounded-full text-xs font-black border uppercase tracking-wider"
                  :class="getStatusBadgeClass(record.status)"
                >
                  {{ formatStatusLabel(record.status) }}
                </span>
              </div>

              <p class="text-slate-800 leading-relaxed font-medium">
                {{ record.desfechoRealEJuridico }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LegalRecord, LegalStatus } from '../domain/models.js';

defineProps<{
  records: LegalRecord[];
}>();

function formatStatusLabel(status: LegalStatus): string {
  switch (status) {
    case LegalStatus.ABSOLVIDO_MERITO:
      return 'Absolvição no Mérito';
    case LegalStatus.ANULADO_VICIO_FORMAL:
      return 'Anulação por Vício Formal';
    case LegalStatus.PRESCRITO:
      return 'Extinto por Prescrição';
    case LegalStatus.ARQUIVADO:
      return 'Arquivado';
    case LegalStatus.CONDENADO:
      return 'Condenado';
    case LegalStatus.EM_ANDAMENTO:
      return 'Em Andamento';
    default:
      return status;
  }
}

function getStatusBadgeClass(status: LegalStatus): string {
  switch (status) {
    case LegalStatus.ABSOLVIDO_MERITO:
      return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    case LegalStatus.ANULADO_VICIO_FORMAL:
      return 'bg-amber-100 text-amber-950 border-amber-300';
    case LegalStatus.PRESCRITO:
      return 'bg-slate-200 text-slate-800 border-slate-300';
    case LegalStatus.ARQUIVADO:
      return 'bg-blue-100 text-blue-900 border-blue-300';
    case LegalStatus.CONDENADO:
      return 'bg-red-100 text-red-900 border-red-300';
    case LegalStatus.EM_ANDAMENTO:
      return 'bg-orange-100 text-orange-900 border-orange-300';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-300';
  }
}

function getDesfechoBg(status: LegalStatus): string {
  switch (status) {
    case LegalStatus.ABSOLVIDO_MERITO:
      return 'bg-emerald-50/20';
    case LegalStatus.ANULADO_VICIO_FORMAL:
      return 'bg-amber-50/20';
    case LegalStatus.CONDENADO:
      return 'bg-red-50/20';
    default:
      return 'bg-transparent';
  }
}
</script>
