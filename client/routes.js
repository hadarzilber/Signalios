import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from './App';
import ResolvedRoute from './App/components/ResolvedRoute';
import shellRoutes from './App/Shell/routes';
import exteriorRoutes from './App/Exterior/routes';
import NotFound from './App/components/NotFound';

const routes = [...exteriorRoutes, ...shellRoutes];

export default () => {
  const history = createBrowserHistory();

  return (
    <BrowserRouter history={history}>
      <App>
        <Switch>
          {routes.map(route => (
            <ResolvedRoute key={route.name} {...route} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </App>
    </BrowserRouter>
  );
};
