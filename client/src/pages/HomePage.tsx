import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useRecoilState } from 'recoil';

import { imageViewerState as ivState } from 'recoil/store';
import palette from 'theme/palette';

import { PostWriter, PostList, ImageViewer } from 'components/HomePage';
import {
  Gnb,
  SideBar,
  InfoSideBar,
  ChatSideBar,
  AlarmSideBar,
  SelectorSideBar,
  GroupSideBar,
  InitUserData,
  InitSocket
} from 'components/common';

const BodyColor = createGlobalStyle`
  body {
    background-color: ${palette.lightgray};
  }
`;

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostContainer = styled.div`
  width: 100%;
  min-width: 720px;
  margin: 0 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomePage = () => {
  const [imageViewerState, setImageViewerState] = useRecoilState(ivState);
  return (
    <HomePageContainer>
      <BodyColor />
      <InitUserData />
      <InitSocket />
      <Gnb type="home" rightModalType="" />
      <PageLayout>
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
        {imageViewerState.isOpen && <ImageViewer />}
      </PageLayout>
    </HomePageContainer>
  );
};

export default HomePage;
