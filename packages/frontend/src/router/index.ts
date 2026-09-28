import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RolesView from '../views/RolesView.vue';
import CandidateDetailView from '../views/CandidateDetailView.vue';
import SantinhoView from '../views/SantinhoView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cargos',
      name: 'roles',
      component: RolesView,
    },
    {
      path: '/candidato/:id',
      name: 'candidate-detail',
      component: CandidateDetailView,
    },
    {
      path: '/santinho',
      name: 'santinho',
      component: SantinhoView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
