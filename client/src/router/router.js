import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import CreateView from '../views/CreateView.vue';
import SurveysView from '../views/SurveysView.vue';
import DashboardView from '../views/DashboardView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateView
  },
  {
    path: '/surveys',
    name: 'Surveys',
    component: SurveysView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
