<template>
  <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-card transition-all">
    <!-- Header with Office Tabs & Poll Sub-selector -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-100">
      <div>
        <div class="flex items-center gap-2">
          <span class="p-1.5 rounded-lg bg-orange-100 text-vibrant-orange">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </span>
          <h2 class="text-xl font-extrabold text-slate-900 tracking-tight">
            Intenção de Votos Auditável (2026)
          </h2>
        </div>
        <p class="text-xs text-slate-500 mt-1">
          Cenário eleitoral estimulado com dados registrados e auditáveis perante a Justiça Eleitoral (Setembro/2026).
        </p>
      </div>

      <!-- Office Filter Tabs -->
      <div class="grid grid-cols-3 sm:inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold w-full sm:w-auto">
        <button
          v-for="tab in tabs"
          :key="tab.role"
          @click="changeRole(tab.role)"
          class="px-2 py-1.5 rounded-lg transition-all cursor-pointer text-center text-xs truncate"
          :class="pollsStore.selectedRole === tab.role ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Sub-selector for Multiple Polls (e.g. AtlasIntel vs Agregador for President) -->
    <div v-if="pollsStore.polls.length > 1" class="mb-5 flex flex-wrap items-center gap-2">
      <span class="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Pesquisas Disponíveis:</span>
      <button
        v-for="p in pollsStore.polls"
        :key="p.id"
        @click="pollsStore.setPoll(p)"
        class="px-3 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer"
        :class="currentPoll?.id === p.id ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'"
      >
        {{ p.instituto.split('(')[0].trim() }}
      </button>
    </div>

    <!-- Loading / Empty / Content -->
    <div v-if="pollsStore.isLoading" class="py-16 text-center">
      <div class="inline-block animate-spin w-8 h-8 border-4 border-vibrant-orange border-t-transparent rounded-full mb-3"></div>
      <p class="text-sm text-slate-500 font-medium">Carregando dados eleitorais oficiais...</p>
    </div>

    <div v-else-if="!currentPoll" class="py-16 text-center text-slate-400">
      <p class="text-sm">Nenhuma pesquisa registrada disponível para este cargo.</p>
    </div>

    <div v-else>
      <!-- Chart Canvas Container -->
      <div class="h-72 w-full relative">
        <Bar :data="chartData" :options="chartOptions" />
      </div>

      <!-- Candidate Quick Stats Row -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-slate-100">
        <div
          v-for="item in currentPoll.intencoes"
          :key="item.candidateId"
          class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between"
          :class="{ 'ring-1 ring-red-400 bg-red-50/20': item.isBaseline }"
        >
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="text-xs font-bold text-slate-700 truncate" :title="item.candidateName">
              {{ item.candidateName }}
            </span>
            <span v-if="item.partySigla" class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white border text-slate-600">
              {{ item.partySigla }}
            </span>
          </div>

          <!-- When Dual Comparison (Senate) -->
          <div v-if="currentPoll.isDualComparison && item.realTimePercent !== undefined" class="space-y-1">
            <div class="flex justify-between items-baseline text-xs">
              <span class="text-blue-700 font-semibold text-[10px]">RealTime:</span>
              <span class="font-extrabold text-blue-900">{{ item.realTimePercent }}%</span>
            </div>
            <div class="flex justify-between items-baseline text-xs">
              <span class="text-purple-700 font-semibold text-[10px]">Quaest:</span>
              <span class="font-extrabold text-purple-900">{{ item.quaestPercent }}%</span>
            </div>
            <span v-if="item.spectrum" class="text-[9px] text-slate-500 block truncate">{{ item.spectrum }}</span>
          </div>

          <!-- Standard Percentage Display -->
          <div v-else class="flex items-baseline gap-1">
            <span class="text-xl font-extrabold text-slate-900">{{ item.percentage }}%</span>
            <span class="text-[11px] text-slate-400">das intenções</span>
          </div>
        </div>

        <div v-if="currentPoll.brancosNulos > 0" class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="text-xs font-semibold text-slate-600">Brancos / Nulos / Indecisos</span>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-xl font-bold text-slate-700">{{ currentPoll.brancosNulos }}%</span>
          </div>
        </div>
      </div>

      <!-- SECOND ROUND RUNOFF SCENARIOS (IF PRESIDENTIAL ATLASINTEL) -->
      <div v-if="currentPoll.secondRoundRunoff && currentPoll.secondRoundRunoff.length > 0" class="mt-6 pt-5 border-t border-slate-200">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-orange-100 text-vibrant-orange border border-orange-200">
              AtlasIntel / Bloomberg
            </span>
            <h3 class="text-sm font-extrabold text-slate-900">Simulações de 2º Turno (Confronto Direto)</h3>
          </div>
          <span class="text-[11px] text-slate-500">Estimulada 2º Turno</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="scenario in currentPoll.secondRoundRunoff"
            :key="scenario.scenario"
            class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between"
          >
            <div>
              <strong class="text-xs text-slate-900 block mb-2">{{ scenario.scenario }}</strong>
              <div class="flex items-center justify-between text-xs mb-1 font-semibold">
                <span class="text-red-700">Lula: {{ scenario.lula }}%</span>
                <span class="text-blue-700">Opositor: {{ scenario.opponent }}%</span>
              </div>
              <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                <div class="bg-red-600 h-2" :style="{ width: `${scenario.lula}%` }"></div>
                <div class="bg-blue-600 h-2" :style="{ width: `${scenario.opponent}%` }"></div>
              </div>
            </div>
            <div class="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
              <span class="text-slate-500">Indecisos: {{ scenario.undecided }}%</span>
              <span
                class="px-1.5 py-0.5 rounded text-[10px] font-bold"
                :class="scenario.status.includes('Empate') ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900'"
              >
                {{ scenario.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- MANDATORY AUDIT FOOTER -->
      <div class="mt-6 pt-4 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <span class="text-slate-400 block font-medium">Instituto Responsável:</span>
            <strong class="text-slate-800 text-sm">{{ currentPoll.instituto }}</strong>
            <span class="text-[11px] text-slate-500 block truncate">{{ currentPoll.cenario }}</span>
          </div>

          <div>
            <span class="text-slate-400 block font-medium">Registro no Tribunal Superior Eleitoral:</span>
            <span class="inline-block mt-0.5 px-2 py-0.5 rounded font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              {{ currentPoll.numeroRegistroTSE }}
            </span>
          </div>

          <div>
            <span class="text-slate-400 block font-medium">Margem de Erro & Amostra:</span>
            <strong class="text-slate-800">
              ± {{ currentPoll.marginOfErrorText || `${currentPoll.margemErro.toFixed(1)} p.p.` }}
            </strong>
            <span class="text-[11px] text-slate-500 block">
              Confiança: {{ currentPoll.nivelConfianca }}% | {{ currentPoll.tamanhoAmostra }} entrevistas
            </span>
          </div>

          <div>
            <span class="text-slate-400 block font-medium">Data e Hora da Coleta/Publicação:</span>
            <strong class="text-slate-800">
              {{ currentPoll.publishedAtText || formatTimestamp(currentPoll.dataHoraDivulgacao) }}
            </strong>
            <span v-if="currentPoll.fieldPeriod" class="text-[11px] text-slate-500 block">
              Período: {{ currentPoll.fieldPeriod }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import { OfficeRole } from '../domain/models.js';
import { usePollsStore } from '../stores/polls.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const pollsStore = usePollsStore();

const tabs = [
  { role: OfficeRole.PRESIDENTE, label: 'Presidente' },
  { role: OfficeRole.GOVERNADOR_SP, label: 'Governador SP' },
  { role: OfficeRole.SENADOR_SP, label: 'Senador SP' },
];

const props = withDefaults(defineProps<{
  role?: OfficeRole;
}>(), {
  role: OfficeRole.PRESIDENTE,
});

onMounted(async () => {
  await pollsStore.fetchPolls(props.role || OfficeRole.PRESIDENTE);
});

watch(() => props.role, async (newRole) => {
  if (newRole && newRole !== pollsStore.selectedRole) {
    await pollsStore.fetchPolls(newRole);
  }
});

async function changeRole(role: OfficeRole) {
  await pollsStore.fetchPolls(role);
}

const currentPoll = computed(() => pollsStore.currentPoll);

const chartData = computed(() => {
  if (!currentPoll.value) {
    return { labels: [], datasets: [] };
  }

  const items = currentPoll.value.intencoes;
  const labels = items.map(i => i.candidateName);

  // If Dual Comparison for Senate (Real Time Big Data vs Quaest)
  if (currentPoll.value.isDualComparison) {
    return {
      labels,
      datasets: [
        {
          label: 'Real Time Big Data (SP-07495/2026)',
          data: items.map(i => i.realTimePercent || 0),
          backgroundColor: '#2563EB',
          borderRadius: 6,
          maxBarThickness: 32,
        },
        {
          label: 'Quaest (SP-02456/2026)',
          data: items.map(i => i.quaestPercent || 0),
          backgroundColor: '#9333EA',
          borderRadius: 6,
          maxBarThickness: 32,
        },
      ],
    };
  }

  // Standard Single Poll
  const data = items.map(i => i.percentage);
  const backgroundColors = items.map(i => i.color || '#3B82F6');

  return {
    labels,
    datasets: [
      {
        label: 'Intenção de Voto (%)',
        data,
        backgroundColor: backgroundColors,
        borderRadius: 8,
        borderSkipped: false,
        maxBarThickness: 56,
      },
    ],
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: Boolean(currentPoll.value?.isDualComparison),
      position: 'top' as const,
      labels: {
        font: { family: 'Inter', size: 12, weight: 600 },
        boxWidth: 14,
      },
    },
    tooltip: {
      callbacks: {
        label: (context: any) => ` ${context.dataset.label ? context.dataset.label + ': ' : ''}${context.parsed.y}%`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: currentPoll.value?.cargo === OfficeRole.GOVERNADOR_SP ? 65 : 55,
      grid: {
        color: '#F1F5F9',
      },
      ticks: {
        callback: (value: any) => `${value}%`,
        font: {
          family: 'Inter',
          size: 11,
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: 'Inter',
          size: 11,
          weight: 600,
        },
      },
    },
  },
}));

function formatTimestamp(isoString: string): string {
  try {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(d);
  } catch {
    return isoString;
  }
}
</script>
