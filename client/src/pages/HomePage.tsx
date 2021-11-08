import React from 'react';
import styled from 'styled-components';

import {
  Gnb,
  SideBar,
  InfoSideBar,
  ChatSideBar,
  GroupSideBar
} from 'components';

const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PostContainer = styled.div`
  position: relative;
  top: 56px;
  width: 680px;
  height: 200vh; // 테스트용 height
  z-index: -1;
  background-color: beige;

  display: flex;
  flex-direction: column;
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <Gnb type="home" />
      <SideBar isLeft={true}>
        <InfoSideBar />
        <GroupSideBar />
      </SideBar>
      <PostContainer></PostContainer>
      <SideBar isLeft={false}>
        <ChatSideBar />
      </SideBar>
    </HomePageContainer>
  );
};

export default HomePage;
