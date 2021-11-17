import React from 'react';
import { RecoilRoot } from 'recoil';
import Router from 'Router';
import { createGlobalStyle } from 'styled-components';

import palette from 'theme/palette';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    font-weight: bold;
    ::placeholder,
    ::-webkit-input-placeholder {
      font-weight: bold;
      font-family: 'Noto Sans KR';
    }
    :-ms-input-placeholder {
      font-weight: bold;
      font-family: 'Noto Sans KR';
    }
  }

  body {
    background-color: ${palette.lightgray};
  }
`;

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Router />
    </RecoilRoot>
  );
}
export default App;
