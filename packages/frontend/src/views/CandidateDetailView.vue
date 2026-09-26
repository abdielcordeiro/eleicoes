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
            <img
              :src="candidate.fotoUrl"
              :alt="candidate.nomeUrna"
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
          <!-- Pillar: Segurança Pública -->
          <div class="p-4 rounded-2xl bg-blue-50/50 border border-blue-200">
            <div class="flex justify-between items-center mb-1.5">
              <span class="font-bold text-xs text-blue-900 uppercase">🛡️ Segurança Pública</span>
              <span class="px-2 py-0.5 rounded font-black text-xs bg-blue-200 text-blue-900">
                Nota {{ candidate.pilares.SEGURANCA_PUBLICA?.score || 0 }}/10
              </span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">{{ candidate.pilares.SEGURANCA_PUBLICA?.summary }}</p>
            <ul class="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
              <li v-for="prop in candidate.pilares.SEGURANCA_PUBLICA?.keyProposals" :key="prop">{{ prop }}</li>
            </ul>
          </div>

          <!-- Pillar: Gastos Públicos -->
          <div class="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200">
            <div class="flex justify-between items-center mb-1.5">
              <span class="font-bold text-xs text-emerald-900 uppercase">💰 Gastos Públicos</span>
              <span class="px-2 py-0.5 rounded font-black text-xs bg-emerald-200 text-emerald-900">
                Nota {{ candidate.pilares.GASTOS_PUBLICOS?.score || 0 }}/10
              </span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">{{ candidate.pilares.GASTOS_PUBLICOS?.summary }}</p>
            <ul class="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
              <li v-for="prop in candidate.pilares.GASTOS_PUBLICOS?.keyProposals" :key="prop">{{ prop }}</li>
            </ul>
          </div>

          <!-- Pillar: Tamanho do Estado -->
          <div class="p-4 rounded-2xl bg-purple-50/50 border border-purple-200">
            <div class="flex justify-between items-center mb-1.5">
              <span class="font-bold text-xs text-purple-900 uppercase">🏛️ Tamanho do Estado & Privatizações</span>
              <span class="px-2 py-0.5 rounded font-black text-xs bg-purple-200 text-purple-900">
                Nota {{ candidate.pilares.TAMANHO_DO_ESTADO?.score || 0 }}/10
              </span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">{{ candidate.pilares.TAMANHO_DO_ESTADO?.summary }}</p>
            <ul class="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
              <li v-for="prop in candidate.pilares.TAMANHO_DO_ESTADO?.keyProposals" :key="prop">{{ prop }}</li>
            </ul>
          </div>

          <!-- Pillar: Saúde -->
          <div class="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
            <div class="flex justify-between items-center mb-1.5">
              <span class="font-bold text-xs text-amber-900 uppercase">🏥 Saúde</span>
              <span class="px-2 py-0.5 rounded font-black text-xs bg-amber-200 text-amber-900">
                Nota {{ candidate.pilares.SAUDE?.score || 0 }}/10
              </span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">{{ candidate.pilares.SAUDE?.summary }}</p>
            <ul class="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
              <li v-for="prop in candidate.pilares.SAUDE?.keyProposals" :key="prop">{{ prop }}</li>
            </ul>
          </div>

          <!-- Pillar: Educação -->
          <div class="p-4 rounded-2xl bg-rose-50/50 border border-rose-200">
            <div class="flex justify-between items-center mb-1.5">
              <span class="font-bold text-xs text-rose-900 uppercase">📚 Educação</span>
              <span class="px-2 py-0.5 rounded font-black text-xs bg-rose-200 text-rose-900">
                Nota {{ candidate.pilares.EDUCACAO?.score || 0 }}/10
              </span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">{{ candidate.pilares.EDUCACAO?.summary }}</p>
            <ul class="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
              <li v-for="prop in candidate.pilares.EDUCACAO?.keyProposals" :key="prop">{{ prop }}</li>
            </ul>
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Mandatos e Cargos -->
        <div>
          <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Mandatos e Atividades Relevantes</h3>
          <div class="space-y-4">
            <div
              v-for="item in candidate.trajetoriaPolitica"
              :key="item.periodo"
              class="border-l-2 border-vibrant-orange pl-4 relative"
            >
              <div class="absolute -left-1.5 top-0.5 w-2.5 h-2.5 rounded-full bg-vibrant-orange"></div>
              <span class="text-[11px] font-mono font-bold text-vibrant-orange block">{{ item.periodo }}</span>
              <strong class="text-sm text-slate-900 block">{{ item.cargoOuAtividade }}</strong>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">{{ item.detalhes }}</p>
            </div>
          </div>
        </div>

        <!-- Histórico Partidário -->
        <div>
          <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Histórico de Filiações Partidárias</h3>
          <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
            <div
              v-for="party in candidate.historicoPartidario"
              :key="party.partido"
              class="flex justify-between items-center py-1.5 border-b border-slate-200 last:border-b-0 text-xs"
            >
              <span class="font-extrabold text-slate-800">{{ party.partido }}</span>
              <span class="text-slate-500 font-mono">{{ party.periodo }}</span>
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
import { OfficeRole } from '../domain/models.js';
import RadarPillarsChart from '../components/RadarPillarsChart.vue';
import LegislativeVotesTable from '../components/LegislativeVotesTable.vue';
import LegalRaioX from '../components/LegalRaioX.vue';

const route = useRoute();
const candidatesStore = useCandidatesStore();
const santinhoStore = useSantinhoStore();

const candidate = computed(() => candidatesStore.currentCandidate);
const isLoading = computed(() => candidatesStore.isLoading);
const isSelected = computed(() => candidate.value ? santinhoStore.isCandidateSelected(candidate.value.id) : false);

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
