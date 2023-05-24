import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const axios = require('axios');
// axios.defaults.baseURL = `https://bitbrowze.com/api/real-t`;
// axios.defaults.baseURL = 'http://localhost:5000/real-t';
// axios.defaults.baseURL = 'http://localhost:5000/real-t';
//axios.defaults.baseURL = 'http://localhost:2700/api/real-t';
axios.defaults.baseURL = 'https://realt.iproprietor.net/api/real-t';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
