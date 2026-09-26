<template>
  <div class="min-h-screen flex flex-col bg-background-warm text-slate-800">
    <Navbar />

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <router-view />
    </main>

    <!-- Global Footer -->
    <footer class="bg-white border-t border-slate-200 mt-auto py-8 no-print">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <p class="font-bold text-slate-700 mb-1">
          VotoConsciente 2026 — Analisador Político & Santinho Digital (SP)
        </p>
        <p class="max-w-2xl mx-auto text-[11px] text-slate-400">
          Dados extraídos e consolidados a partir de repositórios oficiais abertos (TSE DivulgaCandContas, Câmara dos Deputados v2, Senado Federal Legis e institutos de pesquisa estatística registrados). Plataforma suprapartidária orientada por princípios de auditoria e transparência democrática.
        </p>
        <p class="mt-4 text-[10px] text-slate-400 font-mono">
          Eleições Gerais 2026 • Estado de São Paulo
        </p>
      </div>
    </footer>

    <!-- Floating Toast Notifications -->
    <ToastNotification />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import ToastNotification from './components/ToastNotification.vue';
</script>
