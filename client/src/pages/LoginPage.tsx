import styled from 'styled-components';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { currentPageStates } from 'recoil/common';

import { Page } from 'types/common';

import Greeter from 'components/LoginPage/Greeter';
import LoginBox from 'components/LoginPage/LoginBox';
import Footer from 'components/LoginPage/Footer';

const LoginPageContainer = styled.div``;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: 100vw;
  height: 100vh;

  @media screen and (max-width: 880px) {
    display: block;
  }
`;

function LoginPage() {
  const setCurrentPage = useSetRecoilState(currentPageStates);

  useEffect(() => {
    setCurrentPage(Page.LOGIN);
  }, []);

  return (
    <LoginPageContainer>
      <Content>
        <Greeter />
        <LoginBox />
      </Content>
      <Footer />
    </LoginPageContainer>
  );
}

export default LoginPage;
