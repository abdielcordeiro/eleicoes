<template>
  <div class="space-y-10 pb-16">
    <!-- Ballot Card Component -->
    <SantinhoCard />

    <!-- Interactive Candidate Selection Drawer / List -->
    <div class="bg-white rounded-3xl border border-slate-200 p-4 sm:p-8 shadow-card no-print">
      <div class="border-b border-slate-200 pb-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold text-vibrant-orange uppercase tracking-wider block">
            Personalize sua Colinha Eleitoral
          </span>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Escolha dos Candidatos por Cargo
          </h2>
          <p class="text-xs text-slate-500 mt-1 max-w-2xl">
            Clique nos botões de cada candidato para adicionar ou substituir seu voto na urna. Para o Senado, você escolhe independentemente a 1ª e a 2ª vaga.
          </p>
        </div>

        <!-- Quick Search Filter -->
        <div class="w-full md:w-72">
          <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Buscar Candidato</label>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Ex: Pavanato, Derrite, Boulos..."
              class="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50"
            />
            <span class="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          </div>
        </div>
      </div>

      <div class="space-y-8">
        <!-- Loop across roles in exact order of the ballot -->
        <div
          v-for="section in roleSections"
          :key="section.role"
          :id="`section-${section.role}`"
          class="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/60 scroll-mt-24"
        >
          <!-- Role Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-sm font-black uppercase text-slate-900">
                  {{ section.label }}
                </span>
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  {{ section.digits }} Dígitos
                </span>
                <!-- Current status badge -->
                <span
                  class="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  :class="getRoleStatusClass(section.role)"
                >
                  {{ getRoleStatusText(section.role) }}
                </span>
              </div>
              <span class="text-xs text-slate-500 block mt-0.5">
                {{ section.description }}
              </span>
            </div>

            <router-link
              :to="`/cargos?role=${section.role}`"
              class="text-xs font-bold text-vibrant-orange hover:underline shrink-0"
            >
              Ver comparativo completo deste cargo →
            </router-link>
          </div>

          <!-- Special summary bar for Senator seats -->
          <div
            v-if="section.role === OfficeRole.SENADOR_SP"
            class="mb-4 p-3 rounded-xl bg-orange-50/60 border border-orange-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <div class="flex items-center gap-4 flex-wrap">
              <div class="flex items-center gap-1.5">
                <span class="font-bold text-slate-700">1ª Vaga:</span>
                <span
                  v-if="santinhoStore.ballot.senador1"
                  class="font-black text-orange-950 bg-white px-2 py-0.5 rounded-md border border-orange-200 flex items-center gap-1"
                >
                  ✓ {{ santinhoStore.ballot.senador1.nomeUrna }} ({{ santinhoStore.ballot.senador1.numeroUrna }})
                  <button
                    @click="santinhoStore.removeSlot('senador1')"
                    class="text-rose-600 hover:text-rose-800 ml-1 font-bold"
                    title="Remover"
                  >✕</button>
                </span>
                <span v-else class="text-slate-400 italic">Em branco</span>
              </div>

              <div class="flex items-center gap-1.5">
                <span class="font-bold text-slate-700">2ª Vaga:</span>
                <span
                  v-if="santinhoStore.ballot.senador2"
                  class="font-black text-orange-950 bg-white px-2 py-0.5 rounded-md border border-orange-200 flex items-center gap-1"
                >
                  ✓ {{ santinhoStore.ballot.senador2.nomeUrna }} ({{ santinhoStore.ballot.senador2.numeroUrna }})
                  <button
                    @click="santinhoStore.removeSlot('senador2')"
                    class="text-rose-600 hover:text-rose-800 ml-1 font-bold"
                    title="Remover"
                  >✕</button>
                </span>
                <span v-else class="text-slate-400 italic">Em branco</span>
              </div>
            </div>

            <span class="text-[11px] text-slate-500 font-medium">
              Eleições 2026 renovam 2/3 do Senado
            </span>
          </div>

          <!-- Candidates options grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            <div
              v-for="c in getFilteredCandidatesForRole(section.role)"
              :key="c.id"
              class="p-3.5 rounded-2xl border bg-white transition-all flex flex-col justify-between gap-3 shadow-sm hover:shadow-md"
              :class="getCandidateCardClass(c)"
            >
              <!-- Candidate Info Top -->
              <div class="flex items-start gap-3">
                <div class="relative shrink-0">
                  <CandidatePhoto :candidate="c" class="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                  <span
                    v-if="c.isBaseline"
                    class="absolute -bottom-1.5 -right-1 text-[8px] font-black uppercase px-1 py-0.2 bg-slate-900 text-white rounded"
                  >
                    Ref
                  </span>
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-1">
                    <strong class="text-sm text-slate-900 block truncate leading-tight">
                      {{ c.nomeUrna }}
                    </strong>
                  </div>

                  <div class="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {{ c.partido.sigla }}
                    </span>
                    <span class="text-[10px] font-mono font-black text-vibrant-orange">
                      Nº {{ c.numeroUrna }}
                    </span>
                  </div>

                  <span class="text-[10px] text-slate-400 block truncate mt-1" :title="c.nomeCompleto">
                    {{ c.nomeCompleto }}
                  </span>
                </div>
              </div>

              <!-- Selection Status Badge -->
              <div v-if="santinhoStore.isCandidateSelected(c.id)" class="pt-1">
                <span
                  v-if="c.cargo === OfficeRole.SENADOR_SP"
                  class="text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1"
                  :class="santinhoStore.getSenatorSlot(c.id) === 1 ? 'bg-orange-100 text-orange-900 border border-orange-300' : 'bg-amber-100 text-amber-900 border border-amber-300'"
                >
                  <span>🗳️</span>
                  <span>{{ santinhoStore.getSenatorSlot(c.id) === 1 ? '1ª VAGA NO SENADO' : '2ª VAGA NO SENADO' }}</span>
                </span>
                <span
                  v-else
                  class="text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 border border-emerald-300"
                >
                  <span>✓</span>
                  <span>SEU VOTO NA URNA</span>
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                <!-- Case 1: Senator (Dual Seat) Controls -->
                <template v-if="c.cargo === OfficeRole.SENADOR_SP">
                  <div v-if="santinhoStore.isCandidateSelected(c.id)" class="flex items-center gap-1.5">
                    <button
                      v-if="santinhoStore.getSenatorSlot(c.id) === 1"
                      @click="santinhoStore.assignSenator(c, 'senador2')"
                      class="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer text-center"
                      title="Mudar para 2ª Vaga"
                    >
                      Mover p/ 2ª Vaga
                    </button>
                    <button
                      v-else
                      @click="santinhoStore.assignSenator(c, 'senador1')"
                      class="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer text-center"
                      title="Mudar para 1ª Vaga"
                    >
                      Mover p/ 1ª Vaga
                    </button>

                    <button
                      @click="santinhoStore.toggleCandidate(c)"
                      class="py-1.5 px-2.5 rounded-xl text-[11px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer"
                      title="Remover do Santinho"
                    >
                      Remover ✕
                    </button>
                  </div>

                  <!-- Not selected senator: explicit buttons for 1ª Vaga and 2ª Vaga -->
                  <div v-else class="grid grid-cols-2 gap-1.5">
                    <button
                      @click="santinhoStore.assignSenator(c, 'senador1')"
                      class="py-1.5 px-2 rounded-xl text-[11px] font-bold text-slate-800 bg-white border border-slate-300 hover:border-orange-500 hover:bg-orange-50 transition-all cursor-pointer text-center"
                    >
                      + 1ª Vaga
                    </button>
                    <button
                      @click="santinhoStore.assignSenator(c, 'senador2')"
                      class="py-1.5 px-2 rounded-xl text-[11px] font-bold text-slate-800 bg-white border border-slate-300 hover:border-orange-500 hover:bg-orange-50 transition-all cursor-pointer text-center"
                    >
                      + 2ª Vaga
                    </button>
                  </div>
                </template>

                <!-- Case 2: Single-Seat Roles (Presidente, Governador, Deputado Federal, Deputado Estadual) -->
                <template v-else>
                  <div class="flex items-center gap-1.5">
                    <button
                      v-if="santinhoStore.isCandidateSelected(c.id)"
                      @click="santinhoStore.toggleCandidate(c)"
                      class="w-full py-1.5 px-3 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>✕</span>
                      <span>Remover da Urna</span>
                    </button>

                    <button
                      v-else
                      @click="santinhoStore.toggleCandidate(c)"
                      class="w-full py-1.5 px-3 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-vibrant-orange transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>+</span>
                      <span>Escolher para Urna</span>
                    </button>
                  </div>
                </template>

                <!-- Dossier Link -->
                <router-link
                  :to="`/candidato/${c.id}`"
                  class="text-[10px] font-semibold text-slate-500 hover:text-slate-900 text-center block pt-0.5"
                >
                  Ver Raio-X & Histórico →
                </router-link>
              </div>
            </div>
          </div>

          <!-- Empty search results -->
          <div
            v-if="getFilteredCandidatesForRole(section.role).length === 0"
            class="p-6 text-center text-xs text-slate-400 bg-white rounded-xl border border-dashed border-slate-300"
          >
            Nenhum candidato encontrado neste cargo com o termo "{{ searchQuery }}".
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SantinhoCard from '../components/SantinhoCard.vue';
import CandidatePhoto from '../components/CandidatePhoto.vue';
import { useSantinhoStore } from '../stores/santinho.js';
import { useCandidatesStore } from '../stores/candidates.js';
import { OfficeRole, Candidate } from '../domain/models.js';

const santinhoStore = useSantinhoStore();
const candidatesStore = useCandidatesStore();

const searchQuery = ref('');

const roleSections = [
  {
    role: OfficeRole.DEPUTADO_FEDERAL_SP,
    label: '1º Voto: Deputado Federal por SP',
    digits: 4,
    description: 'Escolha 1 candidato a Deputado Federal para representar o Estado de São Paulo na Câmara dos Deputados.',
  },
  {
    role: OfficeRole.DEPUTADO_ESTADUAL_SP,
    label: '2º Voto: Deputado Estadual por SP',
    digits: 5,
    description: 'Escolha 1 candidato a Deputado Estadual para atuar na Assembleia Legislativa do Estado de São Paulo (ALESP).',
  },
  {
    role: OfficeRole.SENADOR_SP,
    label: '3º e 4º Voto: Senador da República por SP (2 Vagas)',
    digits: 3,
    description: 'Em 2026, cada eleitor vota em 2 senadores distintos para o Congresso Nacional. Você define a 1ª e a 2ª vaga.',
  },
  {
    role: OfficeRole.GOVERNADOR_SP,
    label: '5º Voto: Governador do Estado de SP',
    digits: 2,
    description: 'Escolha 1 candidato para chefiar o Poder Executivo do Estado de São Paulo.',
  },
  {
    role: OfficeRole.PRESIDENTE,
    label: '6º Voto: Presidente da República',
    digits: 2,
    description: 'Escolha 1 candidato para a Presidência da República Federativa do Brasil.',
  },
];

onMounted(async () => {
  await Promise.all([
    santinhoStore.fetchSantinho(),
    candidatesStore.fetchCandidates(),
  ]);
});

function getCandidatesForRole(role: OfficeRole): Candidate[] {
  return candidatesStore.candidates.filter(c => c.cargo === role);
}

function getFilteredCandidatesForRole(role: OfficeRole): Candidate[] {
  const list = getCandidatesForRole(role);
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    c =>
      c.nomeUrna.toLowerCase().includes(q) ||
      c.nomeCompleto.toLowerCase().includes(q) ||
      c.partido.sigla.toLowerCase().includes(q) ||
      String(c.numeroUrna).includes(q)
  );
}

function getCandidateCardClass(c: Candidate): string {
  if (santinhoStore.isCandidateSelected(c.id)) {
    return 'border-orange-400 ring-2 ring-orange-400 bg-orange-50/20';
  }
  return 'border-slate-200 hover:border-slate-300';
}

function getRoleStatusText(role: OfficeRole): string {
  const b = santinhoStore.ballot;
  if (role === OfficeRole.DEPUTADO_FEDERAL_SP) {
    return b.deputadoFederal ? `Preenchido: ${b.deputadoFederal.nomeUrna}` : 'Em Branco';
  }
  if (role === OfficeRole.DEPUTADO_ESTADUAL_SP) {
    return b.deputadoEstadual ? `Preenchido: ${b.deputadoEstadual.nomeUrna}` : 'Em Branco';
  }
  if (role === OfficeRole.SENADOR_SP) {
    const s1 = b.senador1 ? 1 : 0;
    const s2 = b.senador2 ? 1 : 0;
    const total = s1 + s2;
    if (total === 2) return '2 de 2 Vagas Preenchidas';
    if (total === 1) return '1 de 2 Vagas Preenchidas';
    return '2 Vagas em Branco';
  }
  if (role === OfficeRole.GOVERNADOR_SP) {
    return b.governador ? `Preenchido: ${b.governador.nomeUrna}` : 'Em Branco';
  }
  if (role === OfficeRole.PRESIDENTE) {
    return b.presidente ? `Preenchido: ${b.presidente.nomeUrna}` : 'Em Branco';
  }
  return '';
}

function getRoleStatusClass(role: OfficeRole): string {
  const b = santinhoStore.ballot;
  let filled = false;
  if (role === OfficeRole.DEPUTADO_FEDERAL_SP && b.deputadoFederal) filled = true;
  if (role === OfficeRole.DEPUTADO_ESTADUAL_SP && b.deputadoEstadual) filled = true;
  if (role === OfficeRole.SENADOR_SP && (b.senador1 || b.senador2)) filled = true;
  if (role === OfficeRole.GOVERNADOR_SP && b.governador) filled = true;
  if (role === OfficeRole.PRESIDENTE && b.presidente) filled = true;

  return filled
    ? 'bg-orange-100 text-orange-950 border border-orange-300'
    : 'bg-slate-200 text-slate-600';
}
</script>
