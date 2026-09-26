<template>
  <div class="space-y-10 pb-16">
    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
      <div class="absolute -right-10 -bottom-10 w-96 h-96 bg-vibrant-orange/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-3xl relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-400 text-xs font-bold mb-4 border border-white/10 backdrop-blur-md">
          <span class="w-2 h-2 rounded-full bg-vibrant-orange animate-ping"></span>
          Eleições Gerais Brasil 2026 • Estado de São Paulo
        </div>

        <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Analisador Político & Santinho Digital Consciente
        </h1>

        <p class="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Compare candidatos lado a lado com base em dados auditáveis, votações legislativas reais, termômetro de alinhamento e o Raio-X jurídico detalhado. Monte sua colinha oficial para a urna eletrônica em 2026.
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <router-link
            to="/cargos"
            class="px-5 py-3 rounded-xl font-bold text-sm bg-vibrant-orange hover:bg-vibrant-orange-hover text-white transition-all transform active:scale-95 shadow-md flex items-center gap-2"
          >
            <span>Ver Candidatos por Cargo</span>
            <span>→</span>
          </router-link>

          <router-link
            to="/santinho"
            class="px-5 py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20 flex items-center gap-2 backdrop-blur-sm"
          >
            <span>Acessar Meu Santinho ({{ santinhoStore.totalSelected }})</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- SECTION 1: AUDITABLE POLL CHART -->
    <section>
      <PollChart />
    </section>

    <!-- SECTION 2: DIRECT COMPARISON MATRIX -->
    <section v-if="candidatesStore.candidates.length > 0">
      <ComparisonMatrix :candidates="candidatesStore.candidates" />
    </section>

    <!-- SECTION 3: SÃO PAULO ELECTIONS SPOTLIGHT -->
    <section class="bg-white rounded-3xl border border-slate-200 p-8 shadow-card">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <span class="text-xs font-bold text-vibrant-orange uppercase tracking-wider block">Foco Regional</span>
          <h2 class="text-2xl font-black text-slate-900 tracking-tight">Eleições em São Paulo 2026</h2>
          <p class="text-xs text-slate-500 mt-1">Governador, as 2 vagas ao Senado e deputados federais e estaduais paulistas com pesquisas auditadas.</p>
        </div>

        <router-link
          to="/cargos"
          class="text-xs font-bold text-vibrant-orange hover:underline flex items-center gap-1"
        >
          <span>Explorar todos os cargos</span>
          <span>→</span>
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1: Governador SP -->
        <div class="p-6 rounded-2xl bg-pastel-blue/40 border border-blue-200 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-blue-600 text-white">2 Dígitos</span>
              <span class="text-xs font-bold text-blue-900">1 Vaga</span>
            </div>
            <h3 class="text-lg font-black text-slate-900 mb-1">Governador de SP</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Disputa pelo Palácio dos Bandeirantes: Tarcísio de Freitas (Republicanos - 10) lidera com 56.5% contra Fernando Haddad (PT - 13) [Referencial] com 33.4% na pesquisa Vox Brasil / Poder360.
            </p>
          </div>
          <router-link
            to="/cargos?role=GOVERNADOR_SP"
            class="mt-4 inline-block text-xs font-bold text-blue-700 hover:text-blue-900 underline"
          >
            Ver Candidatos ao Governo →
          </router-link>
        </div>

        <!-- Card 2: Senador SP (2 Vagas) -->
        <div class="p-6 rounded-2xl bg-pastel-sage/40 border border-emerald-200 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-emerald-700 text-white">3 Dígitos</span>
              <span class="text-xs font-bold text-emerald-900">2 Vagas em 2026</span>
            </div>
            <h3 class="text-lg font-black text-slate-900 mb-1">Senador por SP (2 Vagas)</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Disputa acirrada: Capitão Derrite (PP), André do Prado (PL), Ricardo Salles (NOVO) e Guto Schiavetto (MISSÃO) frente a Marina Silva (REDE) e Simone Tebet (PSB), com pesquisas Real Time e Quaest.
            </p>
          </div>
          <router-link
            to="/cargos?role=SENADOR_SP"
            class="mt-4 inline-block text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
          >
            Ver Candidatos ao Senado (2 Vagas) →
          </router-link>
        </div>

        <!-- Card 3: Deputados SP -->
        <div class="p-6 rounded-2xl bg-pastel-lavender/40 border border-purple-200 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-purple-700 text-white">4 e 5 Dígitos</span>
              <span class="text-xs font-bold text-purple-900">Federal & Estadual</span>
            </div>
            <h3 class="text-lg font-black text-slate-900 mb-1">Deputados por SP</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Deputados Federais (Câmara dos Deputados) e Deputados Estaduais (Assembleia Legislativa de SP - ALESP).
            </p>
          </div>
          <router-link
            to="/cargos?role=DEPUTADO_FEDERAL_SP"
            class="mt-4 inline-block text-xs font-bold text-purple-800 hover:text-purple-950 underline"
          >
            Ver Candidatos a Deputado →
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import PollChart from '../components/PollChart.vue';
import ComparisonMatrix from '../components/ComparisonMatrix.vue';
import { useCandidatesStore } from '../stores/candidates.js';
import { useSantinhoStore } from '../stores/santinho.js';
import { OfficeRole } from '../domain/models.js';

const candidatesStore = useCandidatesStore();
const santinhoStore = useSantinhoStore();

onMounted(async () => {
  await candidatesStore.fetchCandidates();
});

const presidentialCandidates = computed(() => {
  return candidatesStore.candidates.filter(c => c.cargo === OfficeRole.PRESIDENTE);
});
</script>
