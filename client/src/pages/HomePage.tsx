import React from 'react';
import styled from 'styled-components';

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
  InitUserData
} from 'components/common';
import { useRecoilState } from 'recoil';
import { imageViewerState as ivState } from 'recoil/store';

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
`;

const HomePage = () => {
  const [imageViewerState, setImageViewerState] = useRecoilState(ivState);
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
      {imageViewerState.isOpen && <ImageViewer />}
    </HomePageContainer>
  );
};

export default HomePage;
