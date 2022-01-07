import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/Store';

const MainApp = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
export default MainApp;

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

ReactDOM.render(MainApp, document.getElementById('root'));
