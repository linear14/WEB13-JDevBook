// import { Children, useEffect } from 'react';
// import styled, { css } from 'styled-components';
// import githubLogo from '../images/githubLogo.png';

// const StyledButton = styled.button`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
// `;
// const StyledImg = styled.img`
//   width: 50px;
//   height: auto;
// `;

// const Button = ({ children }: any) => {
//     return <StyledButton>{ children }</StyledButton>
// }

// const LoginPage = () => {
//   const loginGithub = (e: any) => {
//     fetch('/oauth/login')
//       .then((res) => res.json())
//       .then((loginLink) => {
//         window.location.href = loginLink;
//       });
//   };

//   useEffect(() => {}, []);

//   return (
//     <div>
//       <StyledButton onClick={loginGithub}>
//         <StyledImg src={githubLogo} />
//         Login with Github
//       </StyledButton>
//     </div>
//   );
// };

import React from 'react';
import styled from 'styled-components';
import Greeter from '../components/LoginPage/Greeter';
import LoginBox from '../components/LoginPage/LoginBox';
import Footer from '../components/LoginPage/Footer';

const LoginPage = () => {
const StyledImg = styled.img`
  width: 30px;
  height: auto;
`;

function LoginPage() {
  const loginGithub = () => {
    fetch('/oauth/login')
      .then((res) => res.json())
      .then((loginLink) => {
        window.location.href = loginLink;
      });
  };
  return (
    <>
    <Content>
      <Greeter />
      <LoginBox />
    </Content>
    <Footer />
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export default LoginPage;
