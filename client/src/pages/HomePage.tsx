import React from 'react';
import styled from 'styled-components';

import palette from 'theme/palette';

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
  padding-bottom: 56px;

  background-color: ${palette.lightgray};
`;

const PostContainer = styled.div`
  position: relative;
  top: 56px;
  width: 680px;

  display: flex;
  flex-direction: column;
  align-items: center;
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
        <PostWriter />
        <PostList />
      </PostContainer>
      <SideBar isLeft={false}>
        <ChatSideBar />
      </SideBar>
    </HomePageContainer>
  );
};

export default HomePage;
