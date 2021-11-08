import React from 'react';
import styled from 'styled-components';

import {
  Gnb,
  SideBar,
  InfoSideBar,
  ChatSideBar,
  GroupSideBar
} from 'components';
import { PostContainer } from 'components/HomePage';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentsWrap = styled.div`
  position: relative;
  top: 56px;

  display: flex;
  justify-content: center;
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <Gnb type="home" />
      <ContentsWrap>
        <SideBar isLeft={true}>
          <InfoSideBar />
          <GroupSideBar />
        </SideBar>
        <PostContainer>PostContainer</PostContainer>
        <SideBar isLeft={false}>
          <ChatSideBar />
        </SideBar>
      </ContentsWrap>
    </HomePageContainer>
  );
};

export default HomePage;
