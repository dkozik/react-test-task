import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import App from './app';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';

ReactDOM.render(
  <ConfigProvider locale={ruRU}>
    <App />
  </ConfigProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
