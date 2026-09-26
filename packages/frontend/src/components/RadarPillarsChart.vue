<template>
  <div class="h-72 w-full flex items-center justify-center">
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'vue-chartjs';
import { CandidatePillarsProfile, ThematicPillar } from '../domain/models.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const props = defineProps<{
  pillars: CandidatePillarsProfile;
  candidateName: string;
}>();

const chartData = computed(() => {
  const p = props.pillars;
  const labels = [
    'Segurança Pública',
    'Gastos Públicos',
    'Tamanho do Estado',
    'Saúde',
    'Educação',
  ];

  const candidateScores = [
    p[ThematicPillar.SEGURANCA_PUBLICA]?.score || 0,
    p[ThematicPillar.GASTOS_PUBLICOS]?.score || 0,
    p[ThematicPillar.TAMANHO_DO_ESTADO]?.score || 0,
    p[ThematicPillar.SAUDE]?.score || 0,
    p[ThematicPillar.EDUCACAO]?.score || 0,
  ];

  return {
    labels,
    datasets: [
      {
        label: props.candidateName,
        data: candidateScores,
        backgroundColor: 'rgba(255, 107, 0, 0.25)',
        borderColor: '#FF6B00',
        pointBackgroundColor: '#FF6B00',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#FF6B00',
        borderWidth: 2,
      },
      {
        label: 'Média de Referência (5.0)',
        data: [5, 5, 5, 5, 5],
        borderColor: '#94A3B8',
        borderDash: [4, 4],
        backgroundColor: 'transparent',
        pointRadius: 0,
        borderWidth: 1.5,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      min: 0,
      max: 10,
      ticks: {
        stepSize: 2,
        font: { size: 10 },
        backdropColor: 'transparent',
      },
      pointLabels: {
        font: {
          family: 'Inter',
          size: 11,
          weight: 600,
        },
        color: '#1E293B',
      },
      grid: {
        color: '#E2E8F0',
      },
      angleLines: {
        color: '#E2E8F0',
      },
    },
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        boxWidth: 12,
        font: { size: 11 },
      },
    },
  },
};
</script>
