import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/userLogin.vue';
import AdminPannel from '../components/AdminPannel.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: UserLogin,
  },
  {
    path: '/callback',
    name: 'LoginCallback',
    component: UserLogin,
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
