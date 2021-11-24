import React from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import Router from 'Router';
import { createGlobalStyle, css } from 'styled-components';

import palette from 'theme/palette';

import { AlertModal } from 'components/common';
import { themeState } from 'recoil/store';
import InitTheme from 'components/common/InitTheme';

const GlobalStyle = createGlobalStyle`
${({ theme }) => {
  return css`
    * {
      font-weight: bold;
      font-family: 'Spoqa Han Sans Neo';
      ::placeholder,
      ::-webkit-input-placeholder {
        font-weight: bold;
        font-family: 'Spoqa Han Sans Neo';
        color: ${(props) => props.theme.darkgray};
      }
      :-ms-input-placeholder {
        font-weight: bold;
        font-family: 'Spoqa Han Sans Neo';
        color: ${(props) => props.theme.darkgray};
      }
    }
  `;
}}
  

  body {
    margin: 0;
  }
`;

const App = () => {
  return (
    <RecoilRoot>
      <InitTheme>
        <GlobalStyle />
        <AlertModal />
        <Router />
      </InitTheme>
    </RecoilRoot>
  );
};
export default App;
