import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Router from './Router';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <RecoilRoot>
    <Router />
  </RecoilRoot>,
  document.getElementById('root')
);

reportWebVitals();
