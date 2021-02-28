import React from 'react';
import Home from './Home';
import Trash from './Trash';
import Archive from './Archive';
import Resources from './Resources';
import Profile from './Profile';
import Shell from '.';

const base = {
  layout: Shell,
  authRequired: true
};

let routes = [
  {
    path: '/home',
    name: 'home',
    exact: true,
    component: Home
  },
  {
    path: '/trash',
    name: 'trash',
    exact: true,
    component: Trash
  },
  {
    path: '/archive',
    name: 'archive',
    exact: true,
    component: Archive
  },
  {
    path: '/resources',
    name: 'resources',
    exact: true,
    component: Resources
  }
];

routes = routes.map(route => ({ ...base, ...route }));

export default routes;
