import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';

ReactDOM.render(
  <BrowserRouter basename='/BlockTrade'>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
