<template>
  <div class="space-y-8 pb-16">
    <!-- Header & Filter Tabs -->
    <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold text-vibrant-orange uppercase tracking-wider block">Eleições Gerais 2026</span>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Cargos em Disputa (São Paulo)
          </h1>
          <p class="text-xs text-slate-500 mt-1">
            Explore os candidatos aos 5 cargos em disputa em 2026 e selecione seus votos para o Santinho Digital.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full md:w-72">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por nome, partido ou número..."
            class="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-vibrant-orange focus:bg-white transition-all"
          />
          <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Role Tabs -->
      <div class="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
        <button
          @click="selectRole(null)"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
          :class="selectedRole === null ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-slate-900'"
        >
          Todos os Cargos
        </button>

        <button
          v-for="role in rolesList"
          :key="role.value"
          @click="selectRole(role.value)"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
          :class="selectedRole === role.value ? 'bg-vibrant-orange text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-slate-900'"
        >
          <span>{{ role.label }}</span>
          <span class="ml-1.5 opacity-80 font-mono text-[10px] bg-black/10 px-1.5 py-0.5 rounded">
            {{ role.digits }} dígitos
          </span>
        </button>
      </div>
    </div>

    <!-- Audit Poll Chart (When role has registered polls) -->
    <div v-if="hasPollForSelectedRole" class="transition-all">
      <PollChart :role="selectedRole!" />
    </div>

    <!-- Comparison Matrix (When role has baseline/challengers) -->
    <div v-if="hasComparisonForSelectedRole" class="transition-all">
      <ComparisonMatrix :candidates="filteredCandidates" :role="selectedRole!" />
    </div>

    <!-- Candidates Section Header -->
    <div class="flex items-center justify-between pt-2">
      <div>
        <h2 class="text-xl font-black text-slate-900 tracking-tight">
          {{ selectedRole ? 'Candidatos Oficiais Registrados' : 'Todos os Candidatos em Disputa' }}
        </h2>
        <p class="text-xs text-slate-500">
          {{ filteredCandidates.length }} candidato(s) disponível(is) para consulta e inclusão no Santinho Digital.
        </p>
      </div>
    </div>

    <!-- Candidates Grid -->
    <div v-if="filteredCandidates.length === 0" class="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400">
      <p class="text-sm font-semibold">Nenhum candidato encontrado para os filtros selecionados.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <CandidateCard
        v-for="candidate in filteredCandidates"
        :key="candidate.id"
        :candidate="candidate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { OfficeRole, Candidate } from '../domain/models.js';
import { useCandidatesStore } from '../stores/candidates.js';
import CandidateCard from '../components/CandidateCard.vue';
import PollChart from '../components/PollChart.vue';
import ComparisonMatrix from '../components/ComparisonMatrix.vue';

const route = useRoute();
const router = useRouter();
const candidatesStore = useCandidatesStore();

const selectedRole = ref<OfficeRole | null>(null);
const searchQuery = ref('');

const rolesList = [
  { value: OfficeRole.PRESIDENTE, label: 'Presidente', digits: 2 },
  { value: OfficeRole.GOVERNADOR_SP, label: 'Governador (SP)', digits: 2 },
  { value: OfficeRole.SENADOR_SP, label: 'Senador (SP - 2 Vagas)', digits: 3 },
  { value: OfficeRole.DEPUTADO_FEDERAL_SP, label: 'Deputado Federal (SP)', digits: 4 },
  { value: OfficeRole.DEPUTADO_ESTADUAL_SP, label: 'Deputado Estadual (SP)', digits: 5 },
];

onMounted(async () => {
  if (route.query.role) {
    selectedRole.value = route.query.role as OfficeRole;
  }
  await candidatesStore.fetchCandidates();
});

watch(() => route.query.role, (newRole) => {
  if (newRole) {
    selectedRole.value = newRole as OfficeRole;
  } else {
    selectedRole.value = null;
  }
});

function selectRole(role: OfficeRole | null) {
  selectedRole.value = role;
  if (role) {
    router.replace({ query: { role } });
  } else {
    router.replace({ query: {} });
  }
}

const filteredCandidates = computed(() => {
  let list = candidatesStore.candidates;

  if (selectedRole.value) {
    list = list.filter(c => c.cargo === selectedRole.value);
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(c =>
      c.nomeCompleto.toLowerCase().includes(q) ||
      c.nomeUrna.toLowerCase().includes(q) ||
      c.partido.sigla.toLowerCase().includes(q) ||
      c.partido.nome.toLowerCase().includes(q) ||
      c.numeroUrna.toString().includes(q)
    );
  }

  return list;
});

const hasPollForSelectedRole = computed(() => {
  return selectedRole.value === OfficeRole.PRESIDENTE ||
         selectedRole.value === OfficeRole.GOVERNADOR_SP ||
         selectedRole.value === OfficeRole.SENADOR_SP;
});

const hasComparisonForSelectedRole = computed(() => {
  return selectedRole.value === OfficeRole.PRESIDENTE ||
         selectedRole.value === OfficeRole.GOVERNADOR_SP ||
         selectedRole.value === OfficeRole.SENADOR_SP;
});
</script>
