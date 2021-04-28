import axios from 'axios';

export const authClient = {
  instance: axios.create({
    baseURL: `/auth`,
    responseType: 'json'
  }),
  authRequired: false
};

export const userClient = {
  instance: axios.create({
    baseURL: `/api/users`,
    responseType: 'json'
  }),
  authRequired: true
};

export const signalClient = {
  instance: axios.create({
    baseURL: `/api/signals`,
    responseType: 'json'
  }),
  authRequired: true
};

export const notificationClient = {
  instance: axios.create({
    baseURL: `/api/notifications`,
    responseType: 'json'
  }),
  authRequired: true
};

export const resourceClient = {
  instance: axios.create({
    baseURL: `/api/resource`,
    responseType: 'json'
  }),
  authRequired: true
};

export const regexClient = {
  instance: axios.create({
    baseURL: `/api/regex`,
    responseType: 'json'
  })
  // authRequired: true
};

export default [
  signalClient,
  userClient,
  authClient,
  notificationClient,
  resourceClient,
  regexClient
];
