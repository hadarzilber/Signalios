import React from 'react';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import Exterior from '.';

const base = {
  layout: Exterior
};

export default [
  {
    path: '/',
    name: 'landing',
    exact: true,
    component: Landing,
    ...base
  },
  {
    path: '/login',
    name: 'login',
    exact: true,
    component: Login,
    ...base
  },
  {
    path: '/register',
    name: 'register',
    exact: true,
    component: Register,
    ...base
  }
];
