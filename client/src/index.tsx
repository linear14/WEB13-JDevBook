import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Router from './Router';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
  document.getElementById('root'),
);

reportWebVitals();
