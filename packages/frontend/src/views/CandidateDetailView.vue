<template>
  <div v-if="isLoading" class="py-24 text-center">
    <div class="inline-block animate-spin w-10 h-10 border-4 border-vibrant-orange border-t-transparent rounded-full mb-4"></div>
    <p class="text-sm font-semibold text-slate-500">Carregando dossiê completo do candidato...</p>
  </div>

  <div v-else-if="!candidate" class="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500">
    <h2 class="text-xl font-bold text-slate-800 mb-2">Candidato não encontrado</h2>
    <p class="text-xs text-slate-400 mb-4">O perfil solicitado não consta no banco de dados local auditado.</p>
    <router-link to="/" class="text-xs font-bold text-vibrant-orange underline">
      Voltar para a Página Inicial
    </router-link>
  </div>

  <div v-else class="space-y-8 pb-16">
    <!-- 1. CABEÇALHO DO CANDIDATO -->
    <section class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <!-- Photo & Identity -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div class="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-slate-200">
            <CandidatePhoto
              :candidate="candidate"
              class="w-full h-full object-cover"
            />
            <div
              v-if="candidate.isBaselineReference"
              class="absolute bottom-0 inset-x-0 bg-red-600 text-white text-[10px] font-bold text-center py-0.5 uppercase tracking-wider"
            >
              Baseline
            </div>
          </div>

          <div>
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <span class="text-xs font-black px-2.5 py-0.5 rounded-md bg-slate-900 text-white">
                {{ formatRole(candidate.cargo) }}
              </span>
              <span class="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                {{ candidate.partido.sigla }} - {{ candidate.partido.numero }}
              </span>
              <span class="text-xs font-bold px-2 py-0.5 rounded-md bg-orange-100 text-orange-900">
                {{ candidate.termometroAlinhamento.classificacao }}
              </span>
            </div>

            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {{ candidate.nomeUrna }}
            </h1>
            <p class="text-xs text-slate-500 font-medium">Nome civil completo: {{ candidate.nomeCompleto }}</p>
            <p class="text-xs text-slate-600 mt-1 max-w-xl">
              <strong>Coligação / Apoios:</strong> {{ candidate.coligacaoOuFederacao }}
            </p>
          </div>
        </div>

        <!-- Right Side: Urna Number & Santinho Checkbox -->
        <div class="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          <div class="text-left lg:text-right">
            <span class="text-[10px] font-mono uppercase text-slate-400 block">Número de Urna</span>
            <!-- Destaque Laranja Vibrante -->
            <div class="inline-block font-mono font-black text-3xl sm:text-4xl px-5 py-2 rounded-2xl bg-vibrant-orange text-white shadow-md border-2 border-orange-400">
              {{ candidate.numeroUrna }}
            </div>
          </div>

          <!-- Checkbox "Incluir no Meu Santinho" -->
          <button
            @click="santinhoStore.toggleCandidate(candidate)"
            class="px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            :class="isSelected ? 'bg-vibrant-orange text-white' : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-vibrant-orange'"
          >
            <input
              type="checkbox"
              :checked="isSelected"
              class="w-4 h-4 accent-vibrant-orange rounded pointer-events-none"
            />
            <span>{{ isSelected ? '✓ Incluso no Meu Santinho' : '+ Incluir no Meu Santinho' }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- 2. ANÁLISE DOS 5 PILARES & RADAR CHART -->
    <section class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <span class="text-xs font-bold text-vibrant-orange uppercase tracking-wider block">Posicionamento Temático</span>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Análise dos 5 Pilares & Radar de Gestão
          </h2>
          <p class="text-xs text-slate-500 mt-1">Pontuação técnica fundamentada em propostas práticas e histórico político.</p>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs font-extrabold text-slate-700">Índice Geral de Alinhamento:</span>
          <span class="text-lg font-black text-vibrant-orange">{{ candidate.termometroAlinhamento.scoreGeral }}%</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Radar Chart (Left Column) -->
        <div class="lg:col-span-5 bg-slate-50/70 p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
          <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Perfil Radial nos 5 Pilares</h4>
          <RadarPillarsChart
            :pillars="candidate.pilares"
            :candidateName="candidate.nomeUrna"
          />
        </div>

        <!-- Pillars Detail Cards (Right Column) -->
        <div class="lg:col-span-7 space-y-4">
          <div
            v-for="cfg in pillarConfigs"
            :key="cfg.key"
            class="p-5 rounded-2xl border transition-all"
            :class="[cfg.borderClass, cfg.bgClass]"
          >
            <!-- Pillar Header -->
            <div class="flex justify-between items-center mb-3">
              <span class="font-extrabold text-xs uppercase flex items-center gap-1.5 text-slate-800">
                <span>{{ cfg.icon }}</span>
                <span>{{ cfg.title }}</span>
              </span>
              <span class="px-2.5 py-0.5 rounded-full font-black text-xs shadow-2xs" :class="[cfg.badgeBg, cfg.badgeText]">
                Nota {{ getPillarData(cfg.key)?.score || 0 }}/10
              </span>
            </div>

            <!-- 1. O QUE DIZ QUE VAI FAZER (Proposta / Diretriz) -->
            <div class="mb-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              <div class="flex items-center gap-1.5 mb-1.5">
                <span class="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  1. O que diz que vai fazer (Proposta / Diretriz):
                </span>
              </div>
              <p class="text-xs text-slate-900 leading-relaxed font-medium">
                {{ getPillarProposal(getPillarData(cfg.key)) }}
              </p>
            </div>

            <!-- 2. COMO VAI FAZER (Mecanismo Prático) OU ALERTA CLARO -->
            <div
              v-if="hasImplementationDetail(getPillarData(cfg.key))"
              class="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/90 shadow-2xs"
            >
              <div class="flex items-center gap-1.5 mb-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  2. Como vai fazer (Mecanismo Prático de Implementação):
                </span>
              </div>
              <p class="text-xs text-slate-800 leading-relaxed font-normal">
                {{ getPillarImplementation(getPillarData(cfg.key)) }}
              </p>
            </div>

            <div
              v-else
              class="p-3.5 rounded-xl bg-amber-50/90 border-2 border-amber-300 text-amber-950 flex items-start gap-2.5 shadow-2xs"
            >
              <span class="text-base leading-none shrink-0 mt-0.5">⚠️</span>
              <div>
                <strong class="font-extrabold text-xs block text-amber-950">
                  Mecanismo prático de implementação não detalhado pelo candidato
                </strong>
                <p class="text-[11px] text-amber-900 leading-relaxed mt-0.5">
                  O candidato não especificou projetos de lei, fontes orçamentárias de custeio, cronogramas ou ações executivas concretas para viabilizar esta proposta em seu plano de governo ou manifestações públicas oficiais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. TRAJETÓRIA E VIDA POLÍTICA -->
    <section class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card">
      <div class="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
        <span class="p-1.5 rounded-lg bg-slate-100 text-slate-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <div>
          <h2 class="text-xl font-black text-slate-900">Trajetória e Vida Política</h2>
          <p class="text-xs text-slate-500">Histórico de cargos eletivos, cargos públicos e trocas partidárias.</p>
        </div>
      </div>

      <!-- Resumo da Trajetória (Summary) -->
      <div v-if="trajectorySummary" class="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
        <span class="text-[11px] font-bold text-vibrant-orange uppercase tracking-wider block mb-1">
          Resumo da Carreira Pública
        </span>
        <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          {{ trajectorySummary }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Mandatos e Cargos Exercidos (officesHeld) -->
        <div>
          <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <span>🏛️</span>
            <span>Cargos e Mandatos Exercidos</span>
          </h3>

          <div v-if="officesHeldList.length === 0" class="text-xs text-slate-400 italic">
            Nenhum mandato público registrado anteriormente.
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="item in officesHeldList"
              :key="item.role + item.period"
              class="border-l-2 border-vibrant-orange pl-4 relative"
            >
              <div class="absolute -left-1.5 top-0.5 w-2.5 h-2.5 rounded-full bg-vibrant-orange"></div>
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <span class="text-[11px] font-mono font-bold text-vibrant-orange">{{ item.period }}</span>
                <span v-if="item.location" class="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-600">
                  {{ item.location }}
                </span>
              </div>
              <strong class="text-sm text-slate-900 block mt-0.5">{{ item.role }}</strong>
            </div>
          </div>
        </div>

        <!-- Histórico Partidário & Alianças -->
        <div class="space-y-6">
          <!-- Party History -->
          <div>
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span>🏷️</span>
              <span>Histórico de Filiações Partidárias</span>
            </h3>

            <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div
                v-for="party in partyHistoryList"
                :key="party.party + party.period"
                class="flex justify-between items-center py-1.5 border-b border-slate-200 last:border-b-0 text-xs"
              >
                <span class="font-extrabold text-slate-800">{{ party.party }}</span>
                <span class="text-slate-500 font-mono">{{ party.period }}</span>
              </div>
            </div>
          </div>

          <!-- Current Alliances -->
          <div v-if="currentAlliancesText">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>🤝</span>
              <span>Alianças e Coligações Atuais</span>
            </h3>
            <div class="p-3.5 rounded-xl bg-orange-50/50 border border-orange-200/60 text-xs text-slate-700 leading-relaxed">
              {{ currentAlliancesText }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. HISTÓRICO DE VOTAÇÕES LEGISLATIVAS (PLS E PECS) -->
    <section>
      <LegislativeVotesTable :votes="candidate.votacoesLegislativas" />
    </section>

    <!-- 5. RAIO-X DE ESCÂNDALOS, PROCESSOS E FICHA LIMPA (MÓDULO CRÍTICO) -->
    <section>
      <LegalRaioX :records="candidate.fichaJuridica" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCandidatesStore } from '../stores/candidates.js';
import { useSantinhoStore } from '../stores/santinho.js';
import { OfficeRole, ThematicPillar, PillarScore } from '../domain/models.js';
import CandidatePhoto from '../components/CandidatePhoto.vue';
import RadarPillarsChart from '../components/RadarPillarsChart.vue';
import LegislativeVotesTable from '../components/LegislativeVotesTable.vue';
import LegalRaioX from '../components/LegalRaioX.vue';

const route = useRoute();
const candidatesStore = useCandidatesStore();
const santinhoStore = useSantinhoStore();

interface PillarConfig {
  key: ThematicPillar;
  title: string;
  icon: string;
  borderClass: string;
  bgClass: string;
  badgeBg: string;
  badgeText: string;
}

const pillarConfigs: PillarConfig[] = [
  {
    key: ThematicPillar.SEGURANCA_PUBLICA,
    title: 'Segurança Pública & Combate ao Crime',
    icon: '🛡️',
    borderClass: 'border-blue-200',
    bgClass: 'bg-blue-50/40',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-900 border border-blue-300'
  },
  {
    key: ThematicPillar.GASTOS_PUBLICOS,
    title: 'Gastos Públicos & Responsabilidade Fiscal',
    icon: '💰',
    borderClass: 'border-emerald-200',
    bgClass: 'bg-emerald-50/40',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900 border border-emerald-300'
  },
  {
    key: ThematicPillar.TAMANHO_DO_ESTADO,
    title: 'Tamanho do Estado & Desestatizações',
    icon: '🏛️',
    borderClass: 'border-purple-200',
    bgClass: 'bg-purple-50/40',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-900 border border-purple-300'
  },
  {
    key: ThematicPillar.SAUDE,
    title: 'Saúde Pública & Gestão Hospitalar',
    icon: '🏥',
    borderClass: 'border-amber-200',
    bgClass: 'bg-amber-50/40',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900 border border-amber-300'
  },
  {
    key: ThematicPillar.EDUCACAO,
    title: 'Educação Básica & Ensino Técnico',
    icon: '📚',
    borderClass: 'border-rose-200',
    bgClass: 'bg-rose-50/40',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-900 border border-rose-300'
  }
];

function getPillarData(key: ThematicPillar): PillarScore | undefined {
  return candidate.value?.pilares?.[key];
}

function getPillarProposal(p?: PillarScore): string {
  if (!p) return 'Proposta não informada.';
  return p.proposal || p.summary || 'Proposta não informada.';
}

function getPillarImplementation(p?: PillarScore): string {
  if (!p) return '';
  return p.implementation || '';
}

function hasImplementationDetail(p?: PillarScore): boolean {
  if (!p) return false;
  if (p.hasImplementationDetail !== undefined) return Boolean(p.hasImplementationDetail);
  return Boolean(p.implementation && p.implementation.trim().length > 0);
}

const candidate = computed(() => candidatesStore.currentCandidate);
const isLoading = computed(() => candidatesStore.isLoading);
const isSelected = computed(() => candidate.value ? santinhoStore.isCandidateSelected(candidate.value.id) : false);

const trajectorySummary = computed(() => {
  return candidate.value?.politicalTrajectory?.summary || candidate.value?.resumoPerfil || '';
});

const officesHeldList = computed(() => {
  if (candidate.value?.politicalTrajectory?.officesHeld && candidate.value.politicalTrajectory.officesHeld.length > 0) {
    return candidate.value.politicalTrajectory.officesHeld;
  }
  if (candidate.value?.trajetoriaPolitica && candidate.value.trajetoriaPolitica.length > 0) {
    return candidate.value.trajetoriaPolitica.map(t => ({
      role: t.cargoOuAtividade,
      period: t.periodo,
      location: t.partidoOuLocal || t.detalhes || '',
    }));
  }
  return [];
});

const partyHistoryList = computed(() => {
  if (candidate.value?.politicalTrajectory?.partyHistory && candidate.value.politicalTrajectory.partyHistory.length > 0) {
    return candidate.value.politicalTrajectory.partyHistory;
  }
  if (candidate.value?.historicoPartidario && candidate.value.historicoPartidario.length > 0) {
    return candidate.value.historicoPartidario.map(p => ({
      party: p.partido,
      period: p.periodo,
    }));
  }
  return [];
});

const currentAlliancesText = computed(() => {
  return candidate.value?.politicalTrajectory?.currentAlliances ||
         candidate.value?.coligacaoOuFederacao ||
         candidate.value?.coalition ||
         '';
});

onMounted(async () => {
  const candidateId = route.params.id as string;
  if (candidateId) {
    await candidatesStore.fetchCandidateById(candidateId);
  }
});

function formatRole(role: OfficeRole): string {
  switch (role) {
    case OfficeRole.PRESIDENTE:
      return 'Presidente da República';
    case OfficeRole.GOVERNADOR_SP:
      return 'Governador de SP';
    case OfficeRole.SENADOR_SP:
      return 'Senador por SP';
    case OfficeRole.DEPUTADO_FEDERAL_SP:
      return 'Deputado Federal SP';
    case OfficeRole.DEPUTADO_ESTADUAL_SP:
      return 'Deputado Estadual SP';
    default:
      return role;
  }
}
</script>
