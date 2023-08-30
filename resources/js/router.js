import { createRouter, createWebHistory } from 'vue-router';

import ProjectDetailsShow from './Pages/ProjectDetails/ProjectDetailsShow.vue';
import ProjectDetailsCreate from './Pages/ProjectDetails/ProjectDetailsCreate.vue';
import AdminPage from './Pages/AdminPage.vue';
import About from './Pages/About.vue';
import WorkHistory from './Pages/WorkHistory.vue';
import ProjectCreate from './Pages/Projects/ProjectCreate.vue';
import NotFound from './Pages/NotFound.vue';

import axios from 'axios';

const routes = [
  {
    path: '/:catchAll(.*)',
    name: 'catchAll',
    component: NotFound,
  },
  {
    path: '/work',
    name: 'work',
    component: WorkHistory
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  //Login
  {
    path: '/login',
    name: 'login',
    component: () => import('./Pages/Login/Login.vue')
  },
  //Project 
  {
    path: '/add_project',
    name: 'addProject',
    component: ProjectCreate,
    beforeEnter: async (to, from, next) => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        next();
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      }
    }
  },
  //Project Details 
  {
    path: '/project_detailed/:id',
    name: 'projectDetailed',
    component: ProjectDetailsShow,
    props: true,
  },
  {
    path: '/create_details',
    name: 'projectDetailsCreate',
    component: ProjectDetailsCreate,
    beforeEnter: async (to, from, next) => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        next();
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      }
    }
  },
  //Admin
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
    beforeEnter: async (to, from, next) => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        next();
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      }
    }
  },
];


export async function isAuthenticated() {
  try {
    const response = await axios.get('/check-user');
    return !!response.data;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;