<template>
  <div class="space-y-10 pb-16">
    <!-- Ballot Card Component -->
    <SantinhoCard />

    <!-- Interactive Candidate Selection Drawer / List -->
    <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card no-print">
      <div class="border-b border-slate-200 pb-4 mb-6">
        <span class="text-xs font-bold text-vibrant-orange uppercase tracking-wider block">Personalize suas Escolhas</span>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
          Gerenciador de Candidatos Selecionados
        </h2>
        <p class="text-xs text-slate-500 mt-1">
          Alterne rapidamente os candidatos para cada um dos cargos em disputa para compor sua colinha eleitoral.
        </p>
      </div>

      <div class="space-y-6">
        <!-- Loop across roles -->
        <div
          v-for="section in roleSections"
          :key="section.role"
          class="p-5 rounded-2xl border border-slate-200 bg-slate-50/50"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span class="text-xs font-black uppercase text-slate-900">
                {{ section.label }}
              </span>
              <span class="text-xs text-slate-500 block">
                {{ section.description }} ({{ section.digits }} dígitos na urna)
              </span>
            </div>

            <router-link
              :to="`/cargos?role=${section.role}`"
              class="text-xs font-bold text-vibrant-orange hover:underline"
            >
              Ver todos candidatos deste cargo →
            </router-link>
          </div>

          <!-- Candidates options grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div
              v-for="c in getCandidatesForRole(section.role)"
              :key="c.id"
              @click="santinhoStore.toggleCandidate(c)"
              class="p-3 rounded-xl border bg-white cursor-pointer transition-all flex items-center justify-between gap-3 hover:border-slate-400"
              :class="santinhoStore.isCandidateSelected(c.id) ? 'border-vibrant-orange ring-1 ring-vibrant-orange bg-orange-50/20' : 'border-slate-200'"
            >
              <div class="flex items-center gap-2.5 min-w-0">
                <img :src="c.fotoUrl" :alt="c.nomeUrna" class="w-10 h-10 rounded-full object-cover shrink-0" />
                <div class="min-w-0">
                  <strong class="text-xs text-slate-900 block truncate">{{ c.nomeUrna }}</strong>
                  <span class="text-[10px] text-slate-500">{{ c.partido.sigla }} • {{ c.numeroUrna }}</span>
                </div>
              </div>

              <input
                type="checkbox"
                :checked="santinhoStore.isCandidateSelected(c.id)"
                class="accent-vibrant-orange w-4 h-4 rounded shrink-0 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import SantinhoCard from '../components/SantinhoCard.vue';
import { useSantinhoStore } from '../stores/santinho.js';
import { useCandidatesStore } from '../stores/candidates.js';
import { OfficeRole } from '../domain/models.js';

const santinhoStore = useSantinhoStore();
const candidatesStore = useCandidatesStore();

const roleSections = [
  {
    role: OfficeRole.DEPUTADO_FEDERAL_SP,
    label: '1º Voto: Deputado Federal (SP)',
    digits: 4,
    description: 'Escolha 1 candidato a Deputado Federal por São Paulo',
  },
  {
    role: OfficeRole.DEPUTADO_ESTADUAL_SP,
    label: '2º Voto: Deputado Estadual (SP)',
    digits: 5,
    description: 'Escolha 1 candidato a Deputado Estadual por São Paulo',
  },
  {
    role: OfficeRole.SENADOR_SP,
    label: '3º e 4º Voto: Senador por SP (2 Vagas)',
    digits: 3,
    description: 'Escolha até 2 candidatos distintos para as vagas de Senador por São Paulo',
  },
  {
    role: OfficeRole.GOVERNADOR_SP,
    label: '5º Voto: Governador do Estado de SP',
    digits: 2,
    description: 'Escolha 1 candidato ao Governo do Estado de SP',
  },
  {
    role: OfficeRole.PRESIDENTE,
    label: '6º Voto: Presidente da República',
    digits: 2,
    description: 'Escolha 1 candidato à Presidência da República',
  },
];

onMounted(async () => {
  await Promise.all([
    santinhoStore.fetchSantinho(),
    candidatesStore.fetchCandidates(),
  ]);
});

function getCandidatesForRole(role: OfficeRole) {
  return candidatesStore.candidates.filter(c => c.cargo === role);
}
</script>
