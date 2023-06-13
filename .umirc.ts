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

    // Author
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

    // Diplom
    {
      path: '/diplom',
      component: './diplom',
    },
    {
      path: '/diplom/edit/:id',
      component: './diplom/edit/[id]',
    },
    {
      path: '/diplom/create',
      component: './diplom/create',
    },

    // Position
    {
      path: '/position',
      component: './position',
    },
    {
      path: '/position/edit/:id',
      component: './position/edit/[id]',
    },
    {
      path: '/position/create',
      component: './position/create',
    },

    // Direction
    {
      path: '/direction',
      component: './direction',
    },
    {
      path: '/direction/edit/:id',
      component: './direction/edit/[id]',
    },
    {
      path: '/direction/create',
      component: './direction/create',
    },

  ], 
  npmClient: 'npm',
});

