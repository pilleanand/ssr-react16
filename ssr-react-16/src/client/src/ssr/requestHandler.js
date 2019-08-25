'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import path from 'path'
import fs from 'fs'
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { StaticRouter, matchPath } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import reducers from '../reducers/index';
import routes from '../routes';
import routesConfigs from './routesConfig';

const middleware = applyMiddleware(thunk);

function renderView(req, res, state) {

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
  });

  // STEP-1 CREATE A REDUX STORE ON THE SERVER
  const store = createStore(reducers, state, middleware);
  const sheetsRegistry = new SheetsRegistry();
  // Create a sheetsManager instance.
  const sheetsManager = new Map();
  const generateClassName = createGenerateClassName();
  // STEP-2 GET INITIAL STATE FROM THE STORE
  const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
  // STEP-3 IMPLEMENT REACT-ROUTER ON THE SERVER TO INTERCEPT CLIENT REQUESTs AND DEFINE WHAT TO DO WITH THEM
  const context = {};
  const reactComponent = renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={context}>
            {routes}
          </StaticRouter>
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  );
  const css = sheetsRegistry.toString()
  const reactMetaComponent = DocumentMeta.renderToStaticMarkup();
  if (context.url) {
    // can use the `context.status` that
    // we added in RedirectWithStatus
    redirect(context.status, context.url);
  } else {
    //https://crypt.codemancers.com/posts/2016-09-16-react-server-side-rendering/
    //res.status(200).render('index', { reactComponent, reactMetaComponent, initialState });
    fs.readFile(path.resolve('build/index.html'), 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('An error occurred')
      }
      const replacedData = data.replace(
        '<div id="root"></div>',
        `<div id="root">${reactComponent}</div>
        <style id="jss-server-side">${css}</style>
        <script>
          window.INITIAL_STATE = ${initialState}
        </script>`
      );
      const replacedMetaTagData = replacedData
        .replace(`<meta id="reactMetaTags"/>`,
          `${reactMetaComponent}`);
      res.send(replacedMetaTagData);
    })
  }
}

function handleRender(req, res) {
  const components = routesConfigs
    .filter(route => matchPath(req.path, route)) // filter matching paths
    .map(route => route.component); // check if components have data requirement
  let promiseObj = null;
  if (components.length > 0 && (components[0].fetchData instanceof Function)) {
    components[0]
      .fetchData(req.query)
      .then((response) => {
        renderView(req, res, response);
      })
      .catch((error) => {
        console.log('***--- handleRender error ', error);
        renderView(req, res, {});
      });
  } else {
    renderView(req, res, {});
  }
}

module.exports = handleRender;
