<template>
  <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card">
    <!-- Header -->
    <div class="p-6 border-b border-slate-200 bg-slate-50/50">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="p-2 rounded-xl bg-blue-100 text-blue-700 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </span>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-lg font-black text-slate-900">Histórico Completo de Votações Legislativas (PECs, PLs e MPs)</h3>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800 border border-blue-200">
                {{ filteredVotes.length }} de {{ votes.length }} matérias
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">
              Relação abrangente de matérias e posicionamentos nominais registrados no Congresso Nacional e na Assembleia Legislativa.
            </p>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="w-full md:w-72">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar por código, tema ou palavra..."
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

      <!-- Filter Tabs by Category and Vote -->
      <div class="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-200/80">
        <!-- Categories -->
        <div class="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectedCategory = cat.id"
            class="px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer text-[11px]"
            :class="selectedCategory === cat.id ? 'bg-slate-900 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Filter by Vote -->
        <div class="flex items-center gap-1.5 text-xs">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Voto:</span>
          <button
            v-for="vt in voteFilters"
            :key="vt.id"
            @click="selectedVoteFilter = vt.id"
            class="px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer text-[11px]"
            :class="selectedVoteFilter === vt.id ? 'bg-vibrant-orange text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'"
          >
            {{ vt.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredVotes.length === 0" class="p-10 text-center text-slate-400 text-xs">
      Nenhuma votação ou proposição encontrada com os filtros selecionados.
    </div>

    <!-- Votes Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
            <th class="p-4 w-44">Tipo / Código</th>
            <th class="p-4 w-48">Tema</th>
            <th class="p-4">Ementa & Impacto da Proposição</th>
            <th class="p-4 w-28 text-center">Data / Ano</th>
            <th class="p-4 w-32 text-center">Como Votou</th>
            <th class="p-4 w-32 text-center">Fonte Oficial</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-xs">
          <tr v-for="vote in filteredVotes" :key="vote.id" class="hover:bg-slate-50/70 transition-colors">
            <!-- Projeto Código & Badge -->
            <td class="p-4 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <span
                  class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border"
                  :class="getTypeBadgeClass(vote.projetoCodigo)"
                >
                  {{ getTypeLabel(vote.projetoCodigo) }}
                </span>
                <span class="font-mono font-black text-slate-900 text-xs">
                  {{ vote.projetoCodigo }}
                </span>
              </div>
            </td>

            <!-- Tema -->
            <td class="p-4 font-semibold text-slate-800">
              <span class="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-xs">
                {{ vote.tema }}
              </span>
            </td>

            <!-- Ementa & Impacto -->
            <td class="p-4">
              <p class="font-medium text-slate-900 leading-snug mb-1">{{ vote.ementa }}</p>
              <p v-if="vote.descricaoImpacto && vote.descricaoImpacto !== vote.ementa" class="text-[11px] text-slate-500 leading-relaxed">
                {{ vote.descricaoImpacto }}
              </p>
            </td>

            <!-- Data -->
            <td class="p-4 text-center text-slate-600 font-mono whitespace-nowrap">
              {{ vote.data }}
            </td>

            <!-- Voto -->
            <td class="p-4 text-center whitespace-nowrap">
              <span
                class="px-3 py-1 rounded-full font-black text-xs inline-block shadow-2xs border"
                :class="getVoteBadgeClass(vote.voto, vote.orientacaoBancada)"
              >
                {{ formatVoteLabel(vote.voto, vote.orientacaoBancada) }}
              </span>
            </td>

            <!-- Fonte Oficial Link -->
            <td class="p-4 text-center whitespace-nowrap">
              <a
                :href="getSafeLink(vote)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 transition-all shadow-xs"
              >
                <span>Ver Oficial</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
import { ref, computed } from 'vue';
import { LegislativeVote } from '../domain/models.js';

const props = defineProps<{
  votes: LegislativeVote[];
}>();

const searchQuery = ref('');
const selectedCategory = ref('TODOS');
const selectedVoteFilter = ref('TODOS');

const categories = [
  { id: 'TODOS', label: 'Todas as Matérias' },
  { id: 'PEC', label: 'PECs (Constitucionais)' },
  { id: 'PL', label: 'Projetos de Lei (PL/PLP)' },
  { id: 'MP', label: 'Medidas Provisórias (MP)' },
  { id: 'LEI', label: 'Leis & Gestão Executiva' },
];

const voteFilters = [
  { id: 'TODOS', label: 'Todos' },
  { id: 'SIM', label: 'SIM' },
  { id: 'NAO', label: 'NÃO' },
  { id: 'OUTROS', label: 'Outros' },
];

function getTypeLabel(code: string): string {
  const c = code.toUpperCase();
  if (c.includes('PEC')) return 'PEC';
  if (c.includes('PLP')) return 'PLP';
  if (c.includes('PL') || c.includes('PROJETO')) return 'PL';
  if (c.includes('MP')) return 'MP';
  if (c.includes('LC') || c.includes('LEI')) return 'LEI';
  return 'MATÉRIA';
}

function getTypeBadgeClass(code: string): string {
  const c = code.toUpperCase();
  if (c.includes('PEC')) return 'bg-purple-100 text-purple-900 border-purple-300';
  if (c.includes('PLP')) return 'bg-blue-100 text-blue-900 border-blue-300';
  if (c.includes('PL')) return 'bg-sky-100 text-sky-900 border-sky-300';
  if (c.includes('MP')) return 'bg-orange-100 text-orange-900 border-orange-300';
  if (c.includes('LEI') || c.includes('LC')) return 'bg-emerald-100 text-emerald-900 border-emerald-300';
  return 'bg-slate-100 text-slate-800 border-slate-300';
}

function formatVoteLabel(vote: string, orientation?: string): string {
  if (orientation && (orientation.includes('AUTOR') || orientation.includes('RELATOR') || orientation.includes('SANCIONADO') || orientation.includes('VETADO'))) {
    return orientation;
  }
  return vote;
}

function getVoteBadgeClass(vote: string, orientation?: string): string {
  const v = (vote || '').toUpperCase();
  const o = (orientation || '').toUpperCase();

  if (v === 'SIM' || o.includes('FAVOR') || o.includes('SANCIONADO') || o.includes('AUTOR')) {
    return 'bg-emerald-100 text-emerald-800 border-emerald-300';
  }
  if (v === 'NAO' || o.includes('CONTRA') || o.includes('VETADO')) {
    return 'bg-red-100 text-red-800 border-red-300';
  }
  if (v === 'ABSTENCAO' || v === 'OBSTRUCAO' || o.includes('ABSTENCAO')) {
    return 'bg-amber-100 text-amber-800 border-amber-300';
  }
  return 'bg-slate-100 text-slate-700 border-slate-300';
}

function getSafeLink(vote: LegislativeVote): string {
  const link = vote.linkOficial;
  if (link && link.startsWith('http') && !link.includes('legis.senado.leg.br') && !link.includes('portal.stf.jus.br')) {
    return link;
  }
  const code = vote.projetoCodigo || vote.tema;
  return `https://www.camara.leg.br/busca-portal?contextoBusca=BuscaGeral&q=${encodeURIComponent(code)}`;
}

const filteredVotes = computed(() => {
  return props.votes.filter(v => {
    // 1. Search Query
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase();
      const match =
        v.projetoCodigo.toLowerCase().includes(q) ||
        v.tema.toLowerCase().includes(q) ||
        v.ementa.toLowerCase().includes(q) ||
        (v.descricaoImpacto && v.descricaoImpacto.toLowerCase().includes(q)) ||
        (v.orientacaoBancada && v.orientacaoBancada.toLowerCase().includes(q));
      if (!match) return false;
    }

    // 2. Category Tab
    if (selectedCategory.value !== 'TODOS') {
      const type = getTypeLabel(v.projetoCodigo);
      if (selectedCategory.value === 'PEC' && type !== 'PEC') return false;
      if (selectedCategory.value === 'PL' && type !== 'PL' && type !== 'PLP') return false;
      if (selectedCategory.value === 'MP' && type !== 'MP') return false;
      if (selectedCategory.value === 'LEI' && type !== 'LEI') return false;
    }

    // 3. Vote Filter
    if (selectedVoteFilter.value !== 'TODOS') {
      const isSim = v.voto === 'SIM' || (v.orientacaoBancada && /SIM|FAVOR|SANCIONADO/i.test(v.orientacaoBancada));
      const isNao = v.voto === 'NAO' || (v.orientacaoBancada && /NÃO|CONTRA/i.test(v.orientacaoBancada));
      if (selectedVoteFilter.value === 'SIM' && !isSim) return false;
      if (selectedVoteFilter.value === 'NAO' && !isNao) return false;
      if (selectedVoteFilter.value === 'OUTROS' && (isSim || isNao)) return false;
    }

    return true;
  });
});
</script>
