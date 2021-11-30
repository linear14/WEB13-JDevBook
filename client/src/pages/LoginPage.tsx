import styled from 'styled-components';

import Greeter from 'components/LoginPage/Greeter';
import LoginBox from 'components/LoginPage/LoginBox';
import Footer from 'components/LoginPage/Footer';
import { useSetRecoilState } from 'recoil';
import { currentPageStates } from 'recoil/store';
import { useEffect } from 'react';
import { Page } from 'types/common';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

function LoginPage() {
  const setCurrentPage = useSetRecoilState(currentPageStates);

  useEffect(() => {
    setCurrentPage(Page.LOGIN);
  }, []);

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

export default LoginPage;
