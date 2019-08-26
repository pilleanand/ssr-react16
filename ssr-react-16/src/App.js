import React, { Component } from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from '@material-ui/core/styles';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red';
import Routes from './client/src/routes';
import reducers from './/client/src/reducers';

const middleware = applyMiddleware(thunk);
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
    type: 'light',
  },
});
const generateClassName = createGenerateClassName();

class App extends Component {
  componentDidMount() {
    //Not required to remove css since it is already came from sssr
    // const jssStyles = document.getElementById('jss-server-side');
    // if (jssStyles && jssStyles.parentNode) {
    //   jssStyles.parentNode.removeChild(jssStyles);
    // }
  }
  
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <JssProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} >
              {Routes}
            </MuiThemeProvider>
          </JssProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
