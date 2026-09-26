<template>
  <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-card transition-all">
    <!-- Header with Office Tabs -->
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
          Cenário eleitoral estimulado com dados registrados e auditáveis perante a Justiça Eleitoral.
        </p>
      </div>

      <!-- Office Filter Tabs -->
      <div class="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
        <button
          v-for="tab in tabs"
          :key="tab.role"
          @click="changeRole(tab.role)"
          class="px-3.5 py-1.5 rounded-lg transition-all cursor-pointer"
          :class="pollsStore.selectedRole === tab.role ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'"
        >
          {{ tab.label }}
        </button>
      </div>
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
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-100">
        <div
          v-for="item in currentPoll.intencoes"
          :key="item.candidateId"
          class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between"
        >
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="text-xs font-bold text-slate-700 truncate">{{ item.candidateName }}</span>
            <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white border text-slate-600">
              {{ item.partySigla }}
            </span>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-xl font-extrabold text-slate-900">{{ item.percentage }}%</span>
            <span class="text-[11px] text-slate-400">das intenções</span>
          </div>
        </div>

        <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="text-xs font-semibold text-slate-600">Brancos / Nulos</span>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-xl font-bold text-slate-700">{{ currentPoll.brancosNulos }}%</span>
          </div>
        </div>

        <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="text-xs font-semibold text-slate-600">Indecisos / Não Sabe</span>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-xl font-bold text-slate-700">{{ currentPoll.indecisos }}%</span>
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
            <strong class="text-slate-800">± {{ currentPoll.margemErro.toFixed(1) }} pontos percentuais</strong>
            <span class="text-[11px] text-slate-500 block">Confiança: {{ currentPoll.nivelConfianca }}% | {{ currentPoll.tamanhoAmostra }} entrevistas</span>
          </div>

          <div>
            <span class="text-slate-400 block font-medium">Data e Hora da Coleta/Publicação:</span>
            <strong class="text-slate-800">{{ formatTimestamp(currentPoll.dataHoraDivulgacao) }}</strong>
            <span class="text-[11px] text-slate-500 block">Período: {{ currentPoll.dataColetaInicio }} a {{ currentPoll.dataColetaFim }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
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

onMounted(async () => {
  await pollsStore.fetchPolls(OfficeRole.PRESIDENTE);
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
  const labels = items.map(i => `${i.candidateName} (${i.partySigla})`);
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

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => ` ${context.parsed.y}% das intenções de voto`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 60,
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
          size: 12,
          weight: 600,
        },
      },
    },
  },
};

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
