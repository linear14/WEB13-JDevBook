import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import Greeter from './pages/login/Greeter';
import LoginBox from './pages/login/LoginBox';

function App() {
  return (
    <Content>
      <Greeter />
      <LoginBox />
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #53B23B;
`;

export default App;
