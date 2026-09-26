<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
    <!-- Header with Office Filter Tabs -->
    <div class="p-6 border-b border-slate-200 bg-slate-50/50">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-vibrant-orange border border-orange-200 uppercase tracking-wide">
              {{ headerTag }}
            </span>
          </div>
          <h2 class="text-2xl font-black text-slate-900 tracking-tight">
            Comparativo Direto Lado a Lado
          </h2>
          <p class="text-sm text-slate-600 mt-1 max-w-3xl">
            {{ headerDescription }}
          </p>
        </div>

        <!-- Office Tabs in Matrix Header -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div class="inline-flex rounded-xl bg-white p-1 border border-slate-200 text-xs font-semibold shadow-sm">
            <button
              v-for="tab in matrixTabs"
              :key="tab.role"
              @click="selectedRole = tab.role"
              class="px-3 py-1.5 rounded-lg transition-all cursor-pointer"
              :class="selectedRole === tab.role ? 'bg-slate-900 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="flex items-center gap-2 text-xs">
            <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span class="text-slate-600 font-medium">Referencial</span>
            <span class="w-2.5 h-2.5 rounded-full bg-vibrant-orange ml-1"></span>
            <span class="text-slate-600 font-medium">Desafiantes</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State if no candidates for this role -->
    <div v-if="filteredCandidates.length === 0" class="p-12 text-center text-slate-400 text-sm">
      Nenhum candidato encontrado para este cargo.
    </div>

    <!-- Scrollable Comparison Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full border-collapse text-left">
        <!-- Table Head: Candidate profiles -->
        <thead>
          <tr class="border-b border-slate-200 bg-white">
            <th class="p-5 w-60 min-w-[240px] text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50/80 sticky left-0 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
              Critério de Análise
            </th>

            <!-- Baseline (Reference) Column -->
            <th
              v-if="baseline"
              class="p-5 min-w-[280px] max-w-[320px] bg-red-50/40 border-r border-red-100 relative align-top"
            >
              <div class="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 uppercase">
                Referencial / Baseline
              </div>
              <div class="flex items-center gap-3 pt-4">
                <CandidatePhoto
                  :candidate="baseline"
                  class="w-14 h-14 rounded-full object-cover border-2 border-red-500 shadow-sm"
                />
                <div>
                  <div class="inline-flex items-center gap-1.5">
                    <span class="text-xs font-extrabold px-2 py-0.5 rounded bg-red-600 text-white font-mono">
                      {{ baseline.numeroUrna || baseline.ballotNumber }}
                    </span>
                    <span class="text-xs font-bold text-slate-600">{{ baseline.partido?.sigla || baseline.party }}</span>
                  </div>
                  <h3 class="text-base font-extrabold text-slate-900 leading-tight">{{ baseline.nomeUrna || baseline.name }}</h3>
                  <span class="text-[11px] text-slate-500 block truncate">{{ baseline.partido?.nome || baseline.party }}</span>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="mt-4 flex items-center justify-between gap-2">
                <router-link
                  :to="`/candidato/${baseline.id}`"
                  class="text-xs font-bold text-slate-700 hover:text-slate-900 underline"
                >
                  Ver Dossiê Completo →
                </router-link>
                <button
                  @click="santinhoStore.toggleCandidate(baseline)"
                  class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  :class="santinhoStore.isCandidateSelected(baseline.id) ? 'bg-vibrant-orange text-white shadow-sm' : 'bg-white border border-slate-300 text-slate-700 hover:border-slate-400'"
                >
                  <input
                    type="checkbox"
                    :checked="santinhoStore.isCandidateSelected(baseline.id)"
                    class="accent-vibrant-orange rounded pointer-events-none"
                  />
                  <span>Santinho</span>
                </button>
              </div>
            </th>

            <!-- Challengers Columns -->
            <th
              v-for="candidate in challengers"
              :key="candidate.id"
              class="p-5 min-w-[280px] max-w-[320px] bg-white border-r border-slate-200 last:border-r-0 align-top"
            >
              <div class="flex items-center gap-3">
                <CandidatePhoto
                  :candidate="candidate"
                  class="w-14 h-14 rounded-full object-cover border-2 border-slate-200 shadow-sm"
                />
                <div>
                  <div class="inline-flex items-center gap-1.5">
                    <span class="text-xs font-extrabold px-2 py-0.5 rounded bg-vibrant-orange text-white font-mono">
                      {{ candidate.numeroUrna || candidate.ballotNumber }}
                    </span>
                    <span class="text-xs font-bold text-slate-600">{{ candidate.partido?.sigla || candidate.party }}</span>
                  </div>
                  <h3 class="text-base font-extrabold text-slate-900 leading-tight">{{ candidate.nomeUrna || candidate.name }}</h3>
                  <span class="text-[11px] text-slate-500 block truncate">{{ candidate.partido?.nome || candidate.party }}</span>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="mt-4 flex items-center justify-between gap-2">
                <router-link
                  :to="`/candidato/${candidate.id}`"
                  class="text-xs font-bold text-slate-700 hover:text-vibrant-orange underline"
                >
                  Ver Dossiê Completo →
                </router-link>
                <button
                  @click="santinhoStore.toggleCandidate(candidate)"
                  class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  :class="santinhoStore.isCandidateSelected(candidate.id) ? 'bg-vibrant-orange text-white shadow-sm' : 'bg-white border border-slate-300 text-slate-700 hover:border-orange-400'"
                >
                  <input
                    type="checkbox"
                    :checked="santinhoStore.isCandidateSelected(candidate.id)"
                    class="accent-vibrant-orange rounded pointer-events-none"
                  />
                  <span>Santinho</span>
                </button>
              </div>
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y divide-slate-100 text-sm">
          <!-- Row 1: Coligação e Federação -->
          <tr class="hover:bg-slate-50/50">
            <td class="p-4 font-bold text-xs text-slate-700 bg-slate-50/80 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
              Coligação / Apoios
            </td>
            <td v-if="baseline" class="p-4 bg-red-50/20 border-r border-red-100 text-xs text-slate-600">
              {{ baseline.coligacaoOuFederacao || baseline.coalition }}
            </td>
            <td v-for="c in challengers" :key="c.id" class="p-4 border-r border-slate-100 text-xs text-slate-600">
              {{ c.coligacaoOuFederacao || c.coalition }}
            </td>
          </tr>

          <!-- Row 2: Termômetro de Alinhamento Geral -->
          <tr class="bg-amber-50/30">
            <td class="p-4 font-bold text-xs text-slate-800 bg-slate-50/80 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
              Termômetro de Alinhamento
              <span class="block text-[10px] font-normal text-slate-500">Média Geral (0 a 100)</span>
            </td>
            <td v-if="baseline" class="p-4 bg-red-50/30 border-r border-red-100">
              <div class="flex items-center gap-2">
                <span class="text-lg font-black text-slate-800">{{ baseline.termometroAlinhamento?.scoreGeral || 30 }}%</span>
                <span class="text-[10px] px-2 py-0.5 rounded font-bold bg-red-100 text-red-800">
                  {{ baseline.termometroAlinhamento?.classificacao || 'Referencial' }}
                </span>
              </div>
              <div class="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                <div class="bg-red-600 h-2 rounded-full" :style="{ width: `${baseline.termometroAlinhamento?.scoreGeral || 30}%` }"></div>
              </div>
            </td>
            <td v-for="c in challengers" :key="c.id" class="p-4 border-r border-slate-100">
              <div class="flex items-center gap-2">
                <span class="text-lg font-black text-vibrant-orange">{{ c.termometroAlinhamento?.scoreGeral || 85 }}%</span>
                <span class="text-[10px] px-2 py-0.5 rounded font-bold bg-orange-100 text-orange-900">
                  {{ c.termometroAlinhamento?.classificacao || 'Direita / Centro-Direita' }}
                </span>
              </div>
              <div class="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                <div class="bg-vibrant-orange h-2 rounded-full" :style="{ width: `${c.termometroAlinhamento?.scoreGeral || 85}%` }"></div>
              </div>
            </td>
          </tr>

          <!-- Alignment breakdown sub-rows -->
          <tr class="text-xs hover:bg-slate-50">
            <td class="p-4 font-medium text-slate-600 bg-slate-50/80 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
              • Liberdade Econômica
            </td>
            <td v-if="baseline" class="p-4 bg-red-50/10 border-r border-red-100 font-semibold text-slate-800">
              {{ baseline.termometroAlinhamento?.liberdadeEconomica || 35 }}%
            </td>
            <td v-for="c in challengers" :key="c.id" class="p-4 border-r border-slate-100 font-bold text-slate-800">
              {{ c.termometroAlinhamento?.liberdadeEconomica || 85 }}%
            </td>
          </tr>

          <tr class="text-xs hover:bg-slate-50">
            <td class="p-4 font-medium text-slate-600 bg-slate-50/80 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
              • Estado Enxuto / Desregulamentação
            </td>
            <td v-if="baseline" class="p-4 bg-red-50/10 border-r border-red-100 font-semibold text-slate-800">
              {{ baseline.termometroAlinhamento?.estadoEnxuto || 25 }}%
            </td>
            <td v-for="c in challengers" :key="c.id" class="p-4 border-r border-slate-100 font-bold text-slate-800">
              {{ c.termometroAlinhamento?.estadoEnxuto || 85 }}%
            </td>
          </tr>

          <tr class="text-xs hover:bg-slate-50">
            <td class="p-4 font-medium text-slate-600 bg-slate-50/80 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
              • Segurança Pública Rigorosa
            </td>
            <td v-if="baseline" class="p-4 bg-red-50/10 border-r border-red-100 font-semibold text-slate-800">
              {{ baseline.termometroAlinhamento?.segurancaRigorosa || 35 }}%
            </td>
            <td v-for="c in challengers" :key="c.id" class="p-4 border-r border-slate-100 font-bold text-slate-800">
              {{ c.termometroAlinhamento?.segurancaRigorosa || 90 }}%
            </td>
          </tr>

          <!-- THEMATIC PILLARS ROWS -->
          <!-- Pillar: Segurança Pública -->
          <tr class="hover:bg-slate-50 border-t-2 border-slate-200">
            <td class="p-4 bg-blue-50/60 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
              <div class="flex items-center gap-1.5 font-bold text-xs text-blue-900 uppercase">
                <span>🛡️ Segurança Pública</span>
              </div>
              <span class="text-[10px] text-slate-500 block mt-0.5">Enfrentamento a facções e leis</span>
            </td>
            <td v-if="baseline" class="p-4 bg-red-50/10 border-r border-red-100 align-top">
              <span class="inline-block px-2 py-0.5 rounded text-xs font-extrabold bg-slate-200 text-slate-800 mb-1.5">
                Nota: {{ baseline.pilares?.SEGURANCA_PUBLICA?.score || 4.5 }}/10
              </span>
              <p class="text-xs text-slate-600 leading-relaxed">
                {{ formatPillarText(baseline.pillars?.segurancaPublica || baseline.pilares?.SEGURANCA_PUBLICA?.summary) }}
              </p>
            </td>
            <td v-for="c in challengers" :key="c.id" class="p-4 border-r border-slate-100 align-top">
              <span class="inline-block px-2 py-0.5 rounded text-xs font-extrabold bg-blue-100 text-blue-800 mb-1.5">
                Nota: {{ c.pilares?.SEGURANCA_PUBLICA?.score || 9.0 }}/10
              </span>
              <p class="text-xs text-slate-700 leading-relaxed">
                {{ formatPillarText(c.pillars?.segurancaPublica || c.pilares?.SEGURANCA_PUBLICA?.summary) }}
              </p>
            </td>
          </tr>

          <!-- Pillar: Gastos Públicos -->
          <tr class="hover:bg-slate-50">
            <td class="p-4 bg-emerald-50/60 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
              <div class="flex items-center gap-1.5 font-bold text-xs text-emerald-900 uppercase">
                <span>💰 Gastos Públicos</span>
              </div>
              <span class="text-[10px] text-slate-500 block mt-0.5">Responsabilidade e cortes</span>
            </td>
            <td v-if="baseline" class="p-4 bg-red-50/10 border-r border-red-100 align-top">
              <span class="inline-block px-2 py-0.5 rounded text-xs font-extrabold bg-slate-200 text-slate-800 mb-1.5">
                Nota: {{ baseline.pilares?.GASTOS_PUBLICOS?.score || 4.0 }}/10
              </span>
              <p class="text-xs text-slate-600 leading-relaxed">
                {{ formatPillarText(baseline.pillars?.gastosPublicos || baseline.pilares?.GASTOS_PUBLICOS?.summary) }}
              </p>
            </td>
            <td v-for="c in challengers" :key="c.id" class="p-4 border-r border-slate-100 align-top">
              <span class="inline-block px-2 py-0.5 rounded text-xs font-extrabold bg-emerald-100 text-emerald-800 mb-1.5">
                Nota: {{ c.pilares?.GASTOS_PUBLICOS?.score || 8.5 }}/10
              </span>
              <p class="text-xs text-slate-700 leading-relaxed">
                {{ formatPillarText(c.pillars?.gastosPublicos || c.pilares?.GASTOS_PUBLICOS?.summary) }}
              </p>
            </td>
          </tr>

          <!-- Pillar: Tamanho do Estado -->
          <tr class="hover:bg-slate-50">
            <td class="p-4 bg-purple-50/60 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
              <div class="flex items-center gap-1.5 font-bold text-xs text-purple-900 uppercase">
                <span>🏛️ Tamanho do Estado</span>
              </div>
              <span class="text-[10px] text-slate-500 block mt-0.5">Privatizações e desregulamentação</span>
            </td>
            <td v-if="baseline" class="p-4 bg-red-50/10 border-r border-red-100 align-top">
              <span class="inline-block px-2 py-0.5 rounded text-xs font-extrabold bg-slate-200 text-slate-800 mb-1.5">
                Nota: {{ baseline.pilares?.TAMANHO_DO_ESTADO?.score || 3.0 }}/10
              </span>
              <p class="text-xs text-slate-600 leading-relaxed">
                {{ formatPillarText(baseline.pillars?.tamanhoDoEstado || baseline.pilares?.TAMANHO_DO_ESTADO?.summary) }}
              </p>
            </td>
            <td v-for="c in challengers" :key="c.id" class="p-4 border-r border-slate-100 align-top">
              <span class="inline-block px-2 py-0.5 rounded text-xs font-extrabold bg-purple-100 text-purple-800 mb-1.5">
                Nota: {{ c.pilares?.TAMANHO_DO_ESTADO?.score || 9.0 }}/10
              </span>
              <p class="text-xs text-slate-700 leading-relaxed">
                {{ formatPillarText(c.pillars?.tamanhoDoEstado || c.pilares?.TAMANHO_DO_ESTADO?.summary) }}
              </p>
            </td>
          </tr>

          <!-- Pillar: Saúde -->
          <tr class="hover:bg-slate-50">
            <td class="p-4 bg-amber-50/60 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
              <div class="flex items-center gap-1.5 font-bold text-xs text-amber-900 uppercase">
                <span>🏥 Saúde Pública</span>
              </div>
              <span class="text-[10px] text-slate-500 block mt-0.5">Gestão do SUS e parcerias</span>
            </td>
            <td v-if="baseline" class="p-4 bg-red-50/10 border-r border-red-100 align-top">
              <span class="inline-block px-2 py-0.5 rounded text-xs font-extrabold bg-slate-200 text-slate-800 mb-1.5">
                Nota: {{ baseline.pilares?.SAUDE?.score || 7.5 }}/10
              </span>
              <p class="text-xs text-slate-600 leading-relaxed">
                {{ formatPillarText(baseline.pillars?.saude || baseline.pilares?.SAUDE?.summary) }}
              </p>
            </td>
            <td v-for="c in challengers" :key="c.id" class="p-4 border-r border-slate-100 align-top">
              <span class="inline-block px-2 py-0.5 rounded text-xs font-extrabold bg-amber-100 text-amber-800 mb-1.5">
                Nota: {{ c.pilares?.SAUDE?.score || 8.0 }}/10
              </span>
              <p class="text-xs text-slate-700 leading-relaxed">
                {{ formatPillarText(c.pillars?.saude || c.pilares?.SAUDE?.summary) }}
              </p>
            </td>
          </tr>

          <!-- Pillar: Educação -->
          <tr class="hover:bg-slate-50">
            <td class="p-4 bg-rose-50/60 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
              <div class="flex items-center gap-1.5 font-bold text-xs text-rose-900 uppercase">
                <span>📚 Educação Básica</span>
              </div>
              <span class="text-[10px] text-slate-500 block mt-0.5">Alfabetização e modelo cívico-militar</span>
            </td>
            <td v-if="baseline" class="p-4 bg-red-50/10 border-r border-red-100 align-top">
              <span class="inline-block px-2 py-0.5 rounded text-xs font-extrabold bg-slate-200 text-slate-800 mb-1.5">
                Nota: {{ baseline.pilares?.EDUCACAO?.score || 7.0 }}/10
              </span>
              <p class="text-xs text-slate-600 leading-relaxed">
                {{ formatPillarText(baseline.pillars?.educacao || baseline.pilares?.EDUCACAO?.summary) }}
              </p>
            </td>
            <td v-for="c in challengers" :key="c.id" class="p-4 border-r border-slate-100 align-top">
              <span class="inline-block px-2 py-0.5 rounded text-xs font-extrabold bg-rose-100 text-rose-800 mb-1.5">
                Nota: {{ c.pilares?.EDUCACAO?.score || 8.0 }}/10
              </span>
              <p class="text-xs text-slate-700 leading-relaxed">
                {{ formatPillarText(c.pillars?.educacao || c.pilares?.EDUCACAO?.summary) }}
              </p>
            </td>
          </tr>

          <!-- Row: Resumo da Situação Jurídica -->
          <tr class="bg-slate-50/90 border-t-2 border-slate-200">
            <td class="p-4 font-bold text-xs text-slate-800 bg-slate-50/90 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
              Resumo da Situação Jurídica
              <span class="block text-[10px] font-normal text-slate-500">Ficha Limpa & Processos</span>
            </td>
            <td v-if="baseline" class="p-4 bg-red-50/30 border-r border-red-100 align-top text-xs leading-relaxed text-slate-700">
              <div class="mb-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  {{ baseline.id === 'lula' ? 'Condenações Anuladas (Vício Formal)' : 'Processos Trancados / Ficha Limpa' }}
                </span>
              </div>
              <p>{{ baseline.resumoSituacaoJuridica }}</p>
            </td>
            <td v-for="c in challengers" :key="c.id" class="p-4 border-r border-slate-100 align-top text-xs leading-relaxed text-slate-700">
              <div class="mb-2">
                <span
                  class="px-2 py-0.5 rounded text-[10px] font-bold border"
                  :class="c.fichaJuridica && c.fichaJuridica.length === 0 ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-800 border-slate-300'"
                >
                  {{ c.fichaJuridica && c.fichaJuridica.length === 0 ? 'Ficha Limpa Sem Processos' : 'Sem Condenações / Ficha Limpa' }}
                </span>
              </div>
              <p>{{ c.resumoSituacaoJuridica }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Candidate, OfficeRole } from '../domain/models.js';
import { useSantinhoStore } from '../stores/santinho.js';
import { useCandidatesStore } from '../stores/candidates.js';
import CandidatePhoto from './CandidatePhoto.vue';

const props = withDefaults(defineProps<{
  candidates?: Candidate[];
  role?: OfficeRole;
}>(), {
  role: OfficeRole.PRESIDENTE,
});

const santinhoStore = useSantinhoStore();
const candidatesStore = useCandidatesStore();

const selectedRole = ref<OfficeRole>(props.role || OfficeRole.PRESIDENTE);

watch(() => props.role, (newRole) => {
  if (newRole) {
    selectedRole.value = newRole;
  }
});

const matrixTabs = [
  { role: OfficeRole.PRESIDENTE, label: 'Presidente' },
  { role: OfficeRole.GOVERNADOR_SP, label: 'Governador SP' },
  { role: OfficeRole.SENADOR_SP, label: 'Senador SP' },
];

const filteredCandidates = computed(() => {
  const source = (props.candidates && props.candidates.length > 0)
    ? props.candidates
    : candidatesStore.candidates;

  return source.filter(c => c.cargo === selectedRole.value);
});

const baseline = computed(() => {
  return filteredCandidates.value.find(c => c.isBaselineReference || c.isBaseline) || null;
});

const challengers = computed(() => {
  return filteredCandidates.value.filter(c => !(c.isBaselineReference || c.isBaseline));
});

const headerTag = computed(() => {
  switch (selectedRole.value) {
    case OfficeRole.GOVERNADOR_SP:
      return 'Matriz Comparativa Governo de São Paulo 2026';
    case OfficeRole.SENADOR_SP:
      return 'Matriz Comparativa Senado por São Paulo 2026 (2 Vagas)';
    default:
      return 'Matriz Comparativa Presidencial 2026';
  }
});

const headerDescription = computed(() => {
  switch (selectedRole.value) {
    case OfficeRole.GOVERNADOR_SP:
      return 'Análise comparativa direta entre Tarcísio de Freitas (Republicanos - 10) e Fernando Haddad (PT - 13) como referencial governamental.';
    case OfficeRole.SENADOR_SP:
      return 'Disputa pelas 2 vagas ao Senado por SP: Guilherme Derrite (PP), Ricardo Salles (NOVO), André do Prado (PL), Guto Schiavetto (MISSÃO) frente a Marina Silva (REDE) como referencial.';
    default:
      return 'Análise detalhada dos principais postulantes à Presidência frente a Luiz Inácio Lula da Silva (PT) como baseline de referência governamental.';
  }
});

function formatPillarText(val: any): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    const prop = val.proposal || '';
    const impl = val.implementation || '';
    if (prop && impl) return `${prop} (Como implementar: ${impl})`;
    return prop || impl || '';
  }
  return String(val);
}
</script>
