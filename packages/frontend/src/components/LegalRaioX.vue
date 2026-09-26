<template>
  <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card">
    <!-- Header with Stats & Filter -->
    <div class="p-6 border-b border-slate-200 bg-slate-50/50">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="p-2 rounded-xl bg-amber-100 text-amber-900 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </span>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-lg font-black text-slate-900 tracking-tight">
                Raio-X Completo de Escândalos, Processos e Ficha Limpa
              </h3>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-950 border border-amber-300">
                {{ filteredRecords.length }} registros auditados
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">
              Auditoria exaustiva de investigações, denúncias, inquéritos e ações judiciais com rigor técnico estrito entre Mérito e Vício Formal.
            </p>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="w-full md:w-72">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar caso, tribunal ou termo..."
              class="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-vibrant-orange focus:border-vibrant-orange text-slate-900"
            />
            <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Status Summary Badges & Filter Tabs -->
      <div class="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-200/80">
        <div class="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            v-for="tab in filterTabs"
            :key="tab.id"
            @click="selectedTab = tab.id"
            class="px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer text-[11px]"
            :class="selectedTab === tab.id ? 'bg-slate-900 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Neutrality Guide Pill -->
        <div class="flex items-center gap-2 text-[10px] font-bold">
          <span class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
            ✓ Mérito = Inocência Atestada
          </span>
          <span class="px-2 py-0.5 rounded-md bg-amber-100 text-amber-950 border border-amber-300">
            ⚠ Vício Formal = Sem Julgamento de Culpa
          </span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredRecords.length === 0" class="p-10 text-center">
      <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h4 class="text-base font-bold text-slate-900">Nenhum Registro Encontrado</h4>
      <p class="text-xs text-slate-500 max-w-md mx-auto mt-1">
        Não constam inquéritos ou processos adicionais com os filtros selecionados para este candidato.
      </p>
    </div>

    <!-- 3-Columns Critical Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
            <th class="p-4 w-1/3 min-w-[280px]">
              1. O Caso, Tribunal e Fonte Oficial
            </th>
            <th class="p-4 w-1/3 min-w-[280px] border-x border-slate-200">
              2. O que Apontavam as Provas & Investigações
            </th>
            <th class="p-4 w-1/3 min-w-[300px]">
              3. Situação Real & Desfecho Jurídico
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 text-xs">
          <tr v-for="record in filteredRecords" :key="record.id" class="align-top hover:bg-slate-50/50 transition-colors">
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

              <!-- Link Externo Seguro (Zero 404) -->
              <a
                :href="getSafeLegalLink(record)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 transition-all shadow-xs"
              >
                <span>Consultar Jurisprudência / Fonte</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </td>

            <!-- COLUNA 2: O que apontavam as Provas / Investigações -->
            <td class="p-5 border-x border-slate-200 bg-slate-50/30">
              <div class="text-slate-700 leading-relaxed font-normal space-y-2">
                <p>{{ record.elementosInvestigacaoEProvas }}</p>
              </div>
            </td>

            <!-- COLUNA 3: Situação Real e Desfecho Jurídico -->
            <td class="p-5" :class="getDesfechoBg(record.status)">
              <div class="mb-3">
                <span
                  class="inline-block px-3 py-1 rounded-full text-xs font-black border uppercase tracking-wider shadow-2xs"
                  :class="getStatusBadgeClass(record.status)"
                >
                  {{ formatStatusLabel(record.status) }}
                </span>
              </div>

              <p class="text-slate-900 leading-relaxed font-medium">
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
import { ref, computed } from 'vue';
import { LegalRecord, LegalStatus } from '../domain/models.js';

const props = defineProps<{
  records: LegalRecord[];
}>();

const searchQuery = ref('');
const selectedTab = ref('TODOS');

const filterTabs = [
  { id: 'TODOS', label: 'Todos os Casos' },
  { id: 'ABSOLVICAO', label: 'Absolvição no Mérito' },
  { id: 'ANULACAO', label: 'Vício Formal / Anulação' },
  { id: 'ARQUIVADO', label: 'Arquivamento' },
  { id: 'PRESCRICAO', label: 'Prescrição' },
  { id: 'FICHA_LIMPA', label: 'Ficha Limpa / Sem Condenação' },
];

function formatStatusLabel(status: LegalStatus): string {
  switch (status) {
    case LegalStatus.ABSOLVIDO_MERITO:
      return 'Absolvição no Mérito';
    case LegalStatus.ANULADO_VICIO_FORMAL:
      return 'Anulação por Vício Formal';
    case LegalStatus.PRESCRITO:
      return 'Extinto por Prescrição';
    case LegalStatus.ARQUIVADO:
      return 'Arquivado por Falta de Provas';
    case LegalStatus.CONDENADO:
      return 'Condenado';
    case LegalStatus.EM_ANDAMENTO:
      return 'Em Andamento / Regular';
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

function getSafeLegalLink(record: LegalRecord): string {
  const link = record.linkFonte;
  if (link && link.startsWith('http') && !link.includes('portal.stf.jus.br') && !link.includes('legis.senado.leg.br')) {
    return link;
  }
  const term = record.tituloCaso || record.resumoCaso;
  return `https://www.conjur.com.br/?s=${encodeURIComponent(term)}`;
}

const filteredRecords = computed(() => {
  return props.records.filter(r => {
    // 1. Search filter
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase();
      const match =
        r.tituloCaso.toLowerCase().includes(q) ||
        r.tribunalOuOrgao.toLowerCase().includes(q) ||
        r.resumoCaso.toLowerCase().includes(q) ||
        r.elementosInvestigacaoEProvas.toLowerCase().includes(q) ||
        r.desfechoRealEJuridico.toLowerCase().includes(q);
      if (!match) return false;
    }

    // 2. Tab filter
    if (selectedTab.value !== 'TODOS') {
      const outcome = (r.desfechoRealEJuridico || '').toLowerCase();
      const st = r.status;
      if (selectedTab.value === 'ABSOLVICAO' && st !== LegalStatus.ABSOLVIDO_MERITO && !outcome.includes('absolvi')) return false;
      if (selectedTab.value === 'ANULACAO' && st !== LegalStatus.ANULADO_VICIO_FORMAL && !outcome.includes('anula') && !outcome.includes('vício')) return false;
      if (selectedTab.value === 'ARQUIVADO' && st !== LegalStatus.ARQUIVADO && !outcome.includes('arquiva')) return false;
      if (selectedTab.value === 'PRESCRICAO' && st !== LegalStatus.PRESCRITO && !outcome.includes('prescri')) return false;
      if (selectedTab.value === 'FICHA_LIMPA' && !outcome.includes('ficha limpa') && !outcome.includes('sem condenação') && !outcome.includes('sem processos') && st !== LegalStatus.ABSOLVIDO_MERITO) return false;
    }

    return true;
  });
});
</script>
