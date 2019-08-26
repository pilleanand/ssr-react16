import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import AboutComponent from './pages/about/components/AboutComponent';
import LandingComponent from './pages/landing/components/LandingComponent';

const Status = function ({ code, children }) {
  return (
    <Router
      render={function ({ staticContext }) {
        if (staticContext) {
          staticContext.status = code;
        }
        return children;
      }}
    />
  );
};

const NotFound = function () {
  return (
    <Status code={404}>
      <div>
        <h2> Sorry, can’t find this page</h2>
      </div>
    </Status>
  );
};

const Routes = (
  <div>
    <Switch>
      <Route path="/" exact={true} component={LandingComponent} />
      <Route path="/about" exact={true} component={AboutComponent} />
    </Switch>
  </div>
);

export default Routes;