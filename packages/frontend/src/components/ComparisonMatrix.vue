<template>
  <div class="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
    <!-- Header with Office Filter Tabs & Mobile View Switcher -->
    <div class="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/50">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 text-vibrant-orange border border-orange-200 uppercase tracking-wide">
              {{ headerTag }}
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Comparativo Direto Lado a Lado
          </h2>
          <p class="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            {{ headerDescription }}
          </p>
        </div>

        <!-- Office Tabs and Mobile Mode Switcher -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          <!-- Role selector tabs -->
          <div class="grid grid-cols-3 sm:inline-flex rounded-xl bg-white p-1 border border-slate-200 text-xs font-semibold shadow-2xs w-full sm:w-auto">
            <button
              v-for="tab in matrixTabs"
              :key="tab.role"
              @click="handleSelectRole(tab.role)"
              class="px-2 py-1.5 rounded-lg transition-all cursor-pointer text-center text-xs truncate"
              :class="selectedRole === tab.role ? 'bg-slate-900 text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Mobile view mode toggle (Duel 1x1 vs Full Table) -->
          <div class="grid grid-cols-2 md:hidden rounded-xl bg-slate-200/80 p-1 text-[11px] font-bold w-full">
            <button
              @click="mobileViewMode = 'duel'"
              class="px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
              :class="mobileViewMode === 'duel' ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-600'"
            >
              <span>⚔️ Duelo 1x1</span>
            </button>
            <button
              @click="mobileViewMode = 'table'"
              class="px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
              :class="mobileViewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-600'"
            >
              <span>📊 Tabela Geral</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="hidden md:flex items-center gap-4 mt-3 pt-3 border-t border-slate-200/60 text-xs">
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span class="text-slate-600 font-semibold">Candidato Referencial (Baseline Governamental)</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-vibrant-orange"></span>
          <span class="text-slate-600 font-semibold">Candidatos Desafiantes</span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredCandidates.length === 0" class="p-12 text-center text-slate-400 text-sm">
      Nenhum candidato encontrado para este cargo.
    </div>

    <div v-else>
      <!-- ================================================================= -->
      <!-- 1. EXPERIÊNCIA EXCLUSIVA MOBILE: DUELO DIRETO 1X1 (Telas < md)   -->
      <!-- ================================================================= -->
      <div v-if="mobileViewMode === 'duel'" class="block md:hidden p-4 space-y-6">
        <!-- Challenger Picker Pills -->
        <div v-if="challengers.length > 0">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Escolha o Desafiante para Comparar:
            </span>
            <span class="text-[10px] text-vibrant-orange font-bold">
              {{ challengers.length }} opções
            </span>
          </div>

          <div class="flex flex-wrap items-center gap-1.5 w-full">
            <button
              v-for="c in challengers"
              :key="c.id"
              @click="selectedChallengerId = c.id"
              class="px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              :class="activeChallenger?.id === c.id
                ? 'bg-vibrant-orange text-white border-vibrant-orange shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'"
            >
              <CandidatePhoto :candidate="c" class="w-5 h-5 rounded-full object-cover shrink-0" />
              <span>{{ c.nomeUrna }}</span>
              <span class="text-[10px] opacity-80">({{ c.partido?.sigla || c.party }})</span>
            </button>
          </div>
        </div>

        <!-- 1x1 DUEL HEADER (50% vs 50%) -->
        <div v-if="baseline && activeChallenger" class="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-3 shadow-xs">
          <!-- Central VS Badge -->
          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-md">
            VS
          </div>

          <div class="grid grid-cols-2 gap-2">
            <!-- Left: Baseline Card -->
            <div class="bg-red-50/50 border border-red-200 rounded-xl p-3 flex flex-col justify-between text-center relative">
              <span class="inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200 mb-2 mx-auto">
                Referencial
              </span>

              <div class="flex flex-col items-center">
                <CandidatePhoto
                  :candidate="baseline"
                  class="w-14 h-14 rounded-full object-cover border-2 border-red-500 shadow-xs mb-2"
                />
                <strong class="text-xs font-black text-slate-900 block truncate max-w-full">
                  {{ baseline.nomeUrna }}
                </strong>
                <span class="text-[10px] font-bold text-slate-600 block mt-0.5">
                  <span class="px-1.5 py-0.2 rounded bg-red-600 text-white font-mono text-[9px] mr-1">{{ baseline.numeroUrna }}</span>
                  {{ baseline.partido?.sigla || baseline.party }}
                </span>
              </div>

              <!-- Baseline Actions -->
              <div class="mt-3 pt-2 border-t border-red-200/80 flex flex-col gap-1.5">
                <button
                  @click="santinhoStore.toggleCandidate(baseline)"
                  class="w-full py-1 px-1.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer"
                  :class="santinhoStore.isCandidateSelected(baseline.id)
                    ? 'bg-vibrant-orange text-white shadow-2xs'
                    : 'bg-white border border-slate-300 text-slate-700'"
                >
                  {{ santinhoStore.isCandidateSelected(baseline.id) ? '✓ No Santinho' : '+ Santinho' }}
                </button>
                <router-link
                  :to="`/candidato/${baseline.id}`"
                  class="text-[10px] text-slate-600 font-bold hover:underline"
                >
                  Ver Dossiê →
                </router-link>
              </div>
            </div>

            <!-- Right: Challenger Card -->
            <div class="bg-orange-50/50 border border-orange-200 rounded-xl p-3 flex flex-col justify-between text-center relative">
              <span class="inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-orange-100 text-orange-900 border border-orange-200 mb-2 mx-auto">
                Desafiante
              </span>

              <div class="flex flex-col items-center">
                <CandidatePhoto
                  :candidate="activeChallenger"
                  class="w-14 h-14 rounded-full object-cover border-2 border-vibrant-orange shadow-xs mb-2"
                />
                <strong class="text-xs font-black text-slate-900 block truncate max-w-full">
                  {{ activeChallenger.nomeUrna }}
                </strong>
                <span class="text-[10px] font-bold text-slate-600 block mt-0.5">
                  <span class="px-1.5 py-0.2 rounded bg-vibrant-orange text-white font-mono text-[9px] mr-1">{{ activeChallenger.numeroUrna }}</span>
                  {{ activeChallenger.partido?.sigla || activeChallenger.party }}
                </span>
              </div>

              <!-- Challenger Actions -->
              <div class="mt-3 pt-2 border-t border-orange-200/80 flex flex-col gap-1.5">
                <button
                  @click="santinhoStore.toggleCandidate(activeChallenger)"
                  class="w-full py-1 px-1.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer"
                  :class="santinhoStore.isCandidateSelected(activeChallenger.id)
                    ? 'bg-vibrant-orange text-white shadow-2xs'
                    : 'bg-white border border-slate-300 text-slate-700'"
                >
                  {{ santinhoStore.isCandidateSelected(activeChallenger.id) ? '✓ No Santinho' : '+ Santinho' }}
                </button>
                <router-link
                  :to="`/candidato/${activeChallenger.id}`"
                  class="text-[10px] text-slate-600 font-bold hover:underline"
                >
                  Ver Dossiê →
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- 1x1 CRITERIA ACCORDION / CARDS -->
        <div v-if="baseline && activeChallenger" class="space-y-4">
          <!-- 1. Termômetro de Alinhamento -->
          <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span class="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                <span>🌡️</span>
                <span>Termômetro de Alinhamento Político</span>
              </span>
            </div>

            <!-- Score comparison bars -->
            <div class="space-y-3">
              <div>
                <div class="flex justify-between items-center text-xs mb-1">
                  <span class="font-bold text-red-700">{{ baseline.nomeUrna }}:</span>
                  <span class="font-mono font-black text-red-700">{{ baseline.termometroAlinhamento?.scoreGeral || 30 }}% ({{ baseline.termometroAlinhamento?.classificacao || 'Referencial' }})</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-red-600 h-2 rounded-full" :style="{ width: `${baseline.termometroAlinhamento?.scoreGeral || 30}%` }"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center text-xs mb-1">
                  <span class="font-bold text-vibrant-orange">{{ activeChallenger.nomeUrna }}:</span>
                  <span class="font-mono font-black text-vibrant-orange">{{ activeChallenger.termometroAlinhamento?.scoreGeral || 85 }}% ({{ activeChallenger.termometroAlinhamento?.classificacao || 'Direita / Centro-Direita' }})</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-vibrant-orange h-2 rounded-full" :style="{ width: `${activeChallenger.termometroAlinhamento?.scoreGeral || 85}%` }"></div>
                </div>
              </div>

              <!-- Indicators breakdown -->
              <div class="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-[10px]">
                <div class="p-2 rounded-xl bg-slate-50">
                  <span class="block text-slate-400 font-semibold mb-1">Liberdade Ec.</span>
                  <span class="font-bold text-red-700 block">{{ baseline.termometroAlinhamento?.liberdadeEconomica || 35 }}%</span>
                  <span class="font-bold text-vibrant-orange block">{{ activeChallenger.termometroAlinhamento?.liberdadeEconomica || 85 }}%</span>
                </div>
                <div class="p-2 rounded-xl bg-slate-50">
                  <span class="block text-slate-400 font-semibold mb-1">Estado Enxuto</span>
                  <span class="font-bold text-red-700 block">{{ baseline.termometroAlinhamento?.estadoEnxuto || 25 }}%</span>
                  <span class="font-bold text-vibrant-orange block">{{ activeChallenger.termometroAlinhamento?.estadoEnxuto || 85 }}%</span>
                </div>
                <div class="p-2 rounded-xl bg-slate-50">
                  <span class="block text-slate-400 font-semibold mb-1">Segurança Rig.</span>
                  <span class="font-bold text-red-700 block">{{ baseline.termometroAlinhamento?.segurancaRigorosa || 35 }}%</span>
                  <span class="font-bold text-vibrant-orange block">{{ activeChallenger.termometroAlinhamento?.segurancaRigorosa || 90 }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. OS 5 PILARES TEMÁTICOS (Com O Que Fará vs Como Fará) -->
          <div class="space-y-3">
            <h3 class="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5 px-1">
              <span>🎯</span>
              <span>Posicionamento nos 5 Pilares Temáticos</span>
            </h3>

            <div
              v-for="pilar in thematicPillarsList"
              :key="pilar.key"
              class="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs"
            >
              <!-- Pillar Header -->
              <div class="p-3 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-base">{{ pilar.icon }}</span>
                  <div>
                    <h4 class="text-xs font-black text-slate-900 leading-tight">{{ pilar.title }}</h4>
                    <span class="text-[10px] text-slate-500">{{ pilar.subtitle }}</span>
                  </div>
                </div>

                <div class="flex items-center gap-1.5 text-[10px] font-black">
                  <span class="px-2 py-0.5 rounded bg-red-100 text-red-800 font-mono">
                    {{ getPillarDetails(baseline, pilar.key).score }}/10
                  </span>
                  <span class="text-slate-400">vs</span>
                  <span class="px-2 py-0.5 rounded bg-orange-100 text-orange-900 font-mono">
                    {{ getPillarDetails(activeChallenger, pilar.key).score }}/10
                  </span>
                </div>
              </div>

              <!-- Two Comparison Columns -->
              <div class="p-3 space-y-3">
                <!-- Baseline Pillar Block -->
                <div class="p-2.5 rounded-xl bg-red-50/30 border border-red-100 text-xs">
                  <div class="flex items-center justify-between mb-1.5">
                    <strong class="text-[11px] font-black text-red-950 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      {{ baseline.nomeUrna }} (Referencial):
                    </strong>
                    <span class="text-[10px] font-extrabold text-red-700 font-mono">Nota {{ getPillarDetails(baseline, pilar.key).score }}/10</span>
                  </div>

                  <!-- 1. O que vai fazer -->
                  <div class="mb-2">
                    <span class="text-[10px] font-bold uppercase text-slate-500 block">1. Proposta / Diretriz:</span>
                    <p class="text-xs text-slate-800 leading-relaxed font-medium mt-0.5">
                      {{ getPillarDetails(baseline, pilar.key).proposal }}
                    </p>
                  </div>

                  <!-- 2. Como vai fazer -->
                  <div v-if="getPillarDetails(baseline, pilar.key).hasImplementation" class="pt-1.5 border-t border-red-200/60">
                    <span class="text-[10px] font-bold uppercase text-slate-500 block">2. Como vai implementar:</span>
                    <p class="text-[11px] text-slate-700 leading-relaxed mt-0.5">
                      {{ getPillarDetails(baseline, pilar.key).implementation }}
                    </p>
                  </div>
                  <div v-else class="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[10px] leading-tight mt-1 flex items-start gap-1">
                    <span>⚠️</span>
                    <span>Mecanismo prático de implementação não detalhado pelo candidato.</span>
                  </div>
                </div>

                <!-- Challenger Pillar Block -->
                <div class="p-2.5 rounded-xl bg-orange-50/30 border border-orange-100 text-xs">
                  <div class="flex items-center justify-between mb-1.5">
                    <strong class="text-[11px] font-black text-orange-950 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-vibrant-orange"></span>
                      {{ activeChallenger.nomeUrna }} (Desafiante):
                    </strong>
                    <span class="text-[10px] font-extrabold text-vibrant-orange font-mono">Nota {{ getPillarDetails(activeChallenger, pilar.key).score }}/10</span>
                  </div>

                  <!-- 1. O que vai fazer -->
                  <div class="mb-2">
                    <span class="text-[10px] font-bold uppercase text-slate-500 block">1. Proposta / Diretriz:</span>
                    <p class="text-xs text-slate-800 leading-relaxed font-medium mt-0.5">
                      {{ getPillarDetails(activeChallenger, pilar.key).proposal }}
                    </p>
                  </div>

                  <!-- 2. Como vai fazer -->
                  <div v-if="getPillarDetails(activeChallenger, pilar.key).hasImplementation" class="pt-1.5 border-t border-orange-200/60">
                    <span class="text-[10px] font-bold uppercase text-slate-500 block">2. Como vai implementar:</span>
                    <p class="text-[11px] text-slate-700 leading-relaxed mt-0.5">
                      {{ getPillarDetails(activeChallenger, pilar.key).implementation }}
                    </p>
                  </div>
                  <div v-else class="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[10px] leading-tight mt-1 flex items-start gap-1">
                    <span>⚠️</span>
                    <span>Mecanismo prático de implementação não detalhado pelo candidato.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Ficha Jurídica e Ficha Limpa -->
          <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <span class="text-xs font-black uppercase text-slate-900 block mb-3 pb-2 border-b border-slate-100">
              ⚖️ Situação Jurídica & Ficha Limpa
            </span>

            <div class="space-y-3 text-xs">
              <!-- Baseline Legal -->
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div class="flex items-center justify-between mb-1">
                  <strong class="text-[11px] text-slate-900">{{ baseline.nomeUrna }}:</strong>
                  <span class="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    {{ baseline.id === 'lula' ? 'Condenações Anuladas (Vício Formal)' : 'Processos Trancados / Ficha Limpa' }}
                  </span>
                </div>
                <p class="text-[11px] text-slate-600 leading-relaxed">{{ baseline.resumoSituacaoJuridica }}</p>
              </div>

              <!-- Challenger Legal -->
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div class="flex items-center justify-between mb-1">
                  <strong class="text-[11px] text-slate-900">{{ activeChallenger.nomeUrna }}:</strong>
                  <span
                    class="px-2 py-0.5 rounded text-[9px] font-bold border"
                    :class="activeChallenger.fichaJuridica && activeChallenger.fichaJuridica.length === 0 ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-800 border-slate-300'"
                  >
                    {{ activeChallenger.fichaJuridica && activeChallenger.fichaJuridica.length === 0 ? 'Ficha Limpa Sem Processos' : 'Sem Condenações / Ficha Limpa' }}
                  </span>
                </div>
                <p class="text-[11px] text-slate-600 leading-relaxed">{{ activeChallenger.resumoSituacaoJuridica }}</p>
              </div>
            </div>
          </div>

          <!-- 4. Coligações e Apoios -->
          <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <span class="text-xs font-black uppercase text-slate-900 block mb-3 pb-2 border-b border-slate-100">
              🤝 Coligações & Alianças Políticas
            </span>

            <div class="space-y-2 text-xs">
              <div class="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <strong class="text-[10px] uppercase text-slate-500 block">{{ baseline.nomeUrna }}:</strong>
                <span class="text-slate-800 font-semibold">{{ baseline.coligacaoOuFederacao || baseline.coalition }}</span>
              </div>
              <div class="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <strong class="text-[10px] uppercase text-slate-500 block">{{ activeChallenger.nomeUrna }}:</strong>
                <span class="text-slate-800 font-semibold">{{ activeChallenger.coligacaoOuFederacao || activeChallenger.coalition }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- 2. TABELA COMPLETA (Desktop ou modo tabela clássica no mobile)    -->
      <!-- ================================================================= -->
      <div
        class="overflow-x-auto"
        :class="mobileViewMode === 'duel' ? 'hidden md:block' : 'block'"
      >
        <table class="w-full border-collapse text-left">
          <!-- Table Head: Candidate profiles -->
          <thead>
            <tr class="border-b border-slate-200 bg-white">
              <!-- A coluna lateral agora é md:sticky md:left-0, evitando cobrir a tela no mobile -->
              <th class="p-4 sm:p-5 w-36 min-w-[140px] md:w-60 md:min-w-[240px] text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50/90 static md:sticky md:left-0 z-20 md:shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                Critério de Análise
              </th>

              <!-- Baseline (Reference) Column -->
              <th
                v-if="baseline"
                class="p-4 sm:p-5 min-w-[260px] max-w-[320px] bg-red-50/40 border-r border-red-100 relative align-top"
              >
                <div class="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 uppercase">
                  Referencial
                </div>
                <div class="flex items-center gap-3 pt-4">
                  <CandidatePhoto
                    :candidate="baseline"
                    class="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-red-500 shadow-2xs"
                  />
                  <div>
                    <div class="inline-flex items-center gap-1.5">
                      <span class="text-xs font-extrabold px-2 py-0.5 rounded bg-red-600 text-white font-mono">
                        {{ baseline.numeroUrna || baseline.ballotNumber }}
                      </span>
                      <span class="text-xs font-bold text-slate-600">{{ baseline.partido?.sigla || baseline.party }}</span>
                    </div>
                    <h3 class="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">{{ baseline.nomeUrna || baseline.name }}</h3>
                    <span class="text-[11px] text-slate-500 block truncate">{{ baseline.partido?.nome || baseline.party }}</span>
                  </div>
                </div>

                <!-- Action buttons -->
                <div class="mt-4 flex items-center justify-between gap-2">
                  <router-link
                    :to="`/candidato/${baseline.id}`"
                    class="text-xs font-bold text-slate-700 hover:text-slate-900 underline"
                  >
                    Ver Dossiê →
                  </router-link>
                  <button
                    @click="santinhoStore.toggleCandidate(baseline)"
                    class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    :class="santinhoStore.isCandidateSelected(baseline.id) ? 'bg-vibrant-orange text-white shadow-2xs' : 'bg-white border border-slate-300 text-slate-700 hover:border-slate-400'"
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
                class="p-4 sm:p-5 min-w-[260px] max-w-[320px] bg-white border-r border-slate-100 relative align-top"
              >
                <div class="flex items-center gap-3">
                  <CandidatePhoto
                    :candidate="candidate"
                    class="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-slate-200 shadow-2xs"
                  />
                  <div>
                    <div class="inline-flex items-center gap-1.5">
                      <span class="text-xs font-extrabold px-2 py-0.5 rounded bg-vibrant-orange text-white font-mono">
                        {{ candidate.numeroUrna || candidate.ballotNumber }}
                      </span>
                      <span class="text-xs font-bold text-slate-600">{{ candidate.partido?.sigla || candidate.party }}</span>
                    </div>
                    <h3 class="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">{{ candidate.nomeUrna || candidate.name }}</h3>
                    <span class="text-[11px] text-slate-500 block truncate">{{ candidate.partido?.nome || candidate.party }}</span>
                  </div>
                </div>

                <!-- Action buttons -->
                <div class="mt-4 flex items-center justify-between gap-2">
                  <router-link
                    :to="`/candidato/${candidate.id}`"
                    class="text-xs font-bold text-slate-700 hover:text-slate-900 underline"
                  >
                    Ver Dossiê →
                  </router-link>
                  <button
                    @click="santinhoStore.toggleCandidate(candidate)"
                    class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    :class="santinhoStore.isCandidateSelected(candidate.id) ? 'bg-vibrant-orange text-white shadow-2xs' : 'bg-white border border-slate-300 text-slate-700 hover:border-orange-400'"
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
              <td class="p-4 font-bold text-xs text-slate-700 bg-slate-50/90 static md:sticky md:left-0 z-10 md:shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
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
              <td class="p-4 font-bold text-xs text-slate-800 bg-slate-50/90 static md:sticky md:left-0 z-10 md:shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                Termômetro de Alinhamento
                <span class="block text-[10px] font-normal text-slate-500">Média Geral (0 a 100)</span>
              </td>
              <td v-if="baseline" class="p-4 bg-red-50/30 border-r border-red-100">
                <div class="flex items-center gap-2">
                  <span class="text-base sm:text-lg font-black text-slate-800">{{ baseline.termometroAlinhamento?.scoreGeral || 30 }}%</span>
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
                  <span class="text-base sm:text-lg font-black text-vibrant-orange">{{ c.termometroAlinhamento?.scoreGeral || 85 }}%</span>
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
              <td class="p-4 font-medium text-slate-600 bg-slate-50/90 static md:sticky md:left-0 z-10 md:shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
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
              <td class="p-4 font-medium text-slate-600 bg-slate-50/90 static md:sticky md:left-0 z-10 md:shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
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
              <td class="p-4 font-medium text-slate-600 bg-slate-50/90 static md:sticky md:left-0 z-10 md:shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
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
            <tr
              v-for="pilar in thematicPillarsList"
              :key="pilar.key"
              class="hover:bg-slate-50 border-t-2 border-slate-200"
            >
              <td class="p-4 bg-slate-50/90 static md:sticky md:left-0 z-10 md:shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                <div class="flex items-center gap-1.5 font-bold text-xs text-slate-900 uppercase">
                  <span>{{ pilar.icon }} {{ pilar.title }}</span>
                </div>
                <span class="text-[10px] text-slate-500 block mt-0.5">{{ pilar.subtitle }}</span>
              </td>

              <!-- Baseline Pillar Cell -->
              <td v-if="baseline" class="p-4 bg-red-50/10 border-r border-red-100 align-top">
                <span class="inline-block px-2 py-0.5 rounded text-xs font-extrabold bg-slate-200 text-slate-800 mb-1.5">
                  Nota: {{ getPillarDetails(baseline, pilar.key).score }}/10
                </span>
                <p class="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {{ formatPillarText(baseline.pillars?.[getPillarRawKey(pilar.key)] || baseline.pilares?.[pilar.key]?.summary) }}
                </p>
              </td>

              <!-- Challengers Pillar Cells -->
              <td v-for="c in challengers" :key="c.id" class="p-4 border-r border-slate-100 align-top">
                <span class="inline-block px-2 py-0.5 rounded text-xs font-extrabold bg-orange-100 text-orange-800 mb-1.5">
                  Nota: {{ getPillarDetails(c, pilar.key).score }}/10
                </span>
                <p class="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {{ formatPillarText(c.pillars?.[getPillarRawKey(pilar.key)] || c.pilares?.[pilar.key]?.summary) }}
                </p>
              </td>
            </tr>

            <!-- Row: Resumo da Situação Jurídica -->
            <tr class="bg-slate-50/90 border-t-2 border-slate-200">
              <td class="p-4 font-bold text-xs text-slate-800 bg-slate-50/90 static md:sticky md:left-0 z-10 md:shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Candidate, OfficeRole, ThematicPillar } from '../domain/models.js';
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
const mobileViewMode = ref<'duel' | 'table'>('duel');
const selectedChallengerId = ref<string | null>(null);

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

function handleSelectRole(role: OfficeRole) {
  selectedRole.value = role;
  selectedChallengerId.value = null; // reseta desafiante ao trocar de cargo
}

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

const activeChallenger = computed(() => {
  if (!challengers.value || challengers.value.length === 0) return null;
  if (selectedChallengerId.value) {
    const found = challengers.value.find(c => c.id === selectedChallengerId.value);
    if (found) return found;
  }
  return challengers.value[0];
});

const thematicPillarsList = [
  {
    key: ThematicPillar.SEGURANCA_PUBLICA,
    title: 'Segurança Pública',
    subtitle: 'Enfrentamento a facções e leis',
    icon: '🛡️',
  },
  {
    key: ThematicPillar.GASTOS_PUBLICOS,
    title: 'Gastos Públicos',
    subtitle: 'Responsabilidade e cortes',
    icon: '💰',
  },
  {
    key: ThematicPillar.TAMANHO_DO_ESTADO,
    title: 'Tamanho do Estado',
    subtitle: 'Privatizações e desregulamentação',
    icon: '🏛️',
  },
  {
    key: ThematicPillar.SAUDE,
    title: 'Saúde Pública',
    subtitle: 'Gestão do SUS e parcerias',
    icon: '🏥',
  },
  {
    key: ThematicPillar.EDUCACAO,
    title: 'Educação Básica',
    subtitle: 'Alfabetização e modelo cívico-militar',
    icon: '📚',
  },
];

function getPillarRawKey(pillarKey: ThematicPillar): string {
  switch (pillarKey) {
    case ThematicPillar.SEGURANCA_PUBLICA:
      return 'segurancaPublica';
    case ThematicPillar.GASTOS_PUBLICOS:
      return 'gastosPublicos';
    case ThematicPillar.TAMANHO_DO_ESTADO:
      return 'tamanhoDoEstado';
    case ThematicPillar.SAUDE:
      return 'saude';
    case ThematicPillar.EDUCACAO:
      return 'educacao';
  }
}

function getPillarDetails(candidate: Candidate | null, pillarKey: ThematicPillar) {
  if (!candidate) {
    return { score: 7.0, proposal: 'Sem dados', implementation: '', hasImplementation: false };
  }

  const p = candidate.pilares?.[pillarKey];
  const rawKey = getPillarRawKey(pillarKey);
  const rawP = (candidate.pillars as any)?.[rawKey];

  const score = p?.score || 7.0;
  let proposal = p?.proposal || p?.summary || '';
  let implementation = p?.implementation || '';
  let hasImplementation = p?.hasImplementationDetail;

  if (typeof rawP === 'object' && rawP !== null) {
    if (!proposal) proposal = rawP.proposal || rawP.summary || '';
    if (!implementation) implementation = rawP.implementation || '';
    if (hasImplementation === undefined) {
      hasImplementation = Boolean(rawP.hasImplementationDetail ?? (implementation && implementation.trim().length > 0));
    }
  } else if (typeof rawP === 'string' && !proposal) {
    proposal = rawP;
  }

  return {
    score,
    proposal: proposal || 'Diretrizes em consolidação no plano partidário oficial.',
    implementation: implementation || '',
    hasImplementation: Boolean(hasImplementation ?? (implementation && implementation.trim().length > 0)),
  };
}

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
  if (!val) return 'Sem dados cadastrados';
  if (typeof val === 'string') {
    return `🎯 Proposta: ${val}\n\n⚠️ Como implementar: O candidato não detalhou o mecanismo prático de execução desta proposta em seu plano oficial.`;
  }
  if (typeof val === 'object') {
    const prop = val.proposal || val.summary || '';
    const impl = val.implementation || '';
    if (prop && impl) {
      return `🎯 Proposta: ${prop}\n\n⚙️ Como implementar: ${impl}`;
    }
    if (prop && !impl) {
      return `🎯 Proposta: ${prop}\n\n⚠️ Como implementar: O candidato não detalhou o mecanismo prático de execução desta proposta em seu plano oficial.`;
    }
    return prop || impl || 'Sem dados cadastrados';
  }
  return String(val);
}
</script>
