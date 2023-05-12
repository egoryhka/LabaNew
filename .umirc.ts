import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  /* layout: {
    title: '@umijs/max',
  }, */
  
  routes: [
    {
      path: '/',
      component: './index',
    },
    {
      path: '/docs',
      component: './docs',
    },
    {
      path: '/author',
      component: './author',
    },
    {
      path: '/author/edit/:id',
      component: './author/edit/[id]',
    },
    {
      path: '/author/create',
      component: './author/create',
    },
  ], 
  npmClient: 'npm',
});

