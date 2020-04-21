import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './layouts/MainLayout';
import 'antd/dist/antd.css';
import './index.css';
import { Provider } from 'react-redux';
import { initialize } from './auth/AuthStoreInitializer';
import { createStore } from 'redux';
import reducers from './store/reducers';

const store = createStore(reducers);

const authStore = initialize(store);

ReactDOM.render(
  <Provider store={authStore}>
    <MainLayout />
  </Provider>,
  document.getElementById('root')
);
