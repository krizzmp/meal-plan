//@flow
import ReactDOM from 'react-dom';
import React from 'react';
import App from './views/pages/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App_ = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App_ />, document.querySelector('#app'));
});