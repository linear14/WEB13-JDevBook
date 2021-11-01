import React from 'react';
import styled from 'styled-components';
import { Gnb, SideBar, InfoSideBar, ChatSideBar, GroupSideBar } from '../components';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentsWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <Gnb />
      <ContentsWrap>
        <SideBar>
          <InfoSideBar />
          <GroupSideBar />
        </SideBar>
        <SideBar>
          <ChatSideBar />
        </SideBar>
      </ContentsWrap>
    </HomePageContainer>
  );
};

export default HomePage;
