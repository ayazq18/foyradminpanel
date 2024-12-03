import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/userLogin.vue';
import AdminPannel from '../components/AdminPannel.vue';
import AuthCallback from '@/components/AuthCallback.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: UserLogin,
  },
  {
    path: '/callback',
    name: 'AuthCallback',
    component: AuthCallback,
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPannel,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
