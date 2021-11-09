import React from 'react';
import styled from 'styled-components';

import { PostWriter, PostList } from 'components/HomePage';

import {
  Gnb,
  SideBar,
  InfoSideBar,
  ChatSideBar,
  AlarmSideBar,
  SelectorSideBar,
  GroupSideBar,
  InitUserData
} from 'components/common';

const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PostContainer = styled.div`
  position: relative;
  top: 56px;
  width: 680px;
  height: 200vh; // 테스트용 height

  display: flex;
  flex-direction: column;
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <InitUserData />
      <Gnb type="home" rightModalType="" />
      <SideBar isLeft={true}>
        <InfoSideBar />
        <GroupSideBar />
      </SideBar>
      <PostContainer>
        <PostWriter></PostWriter>
        <PostList />
      </PostContainer>
      <SideBar isLeft={false}>
        <ChatSideBar />
      </SideBar>
    </HomePageContainer>
  );
};

export default HomePage;
