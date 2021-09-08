import React from 'react';
import ReactDOM from 'react-dom';

import { store } from './store/indexStore';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

