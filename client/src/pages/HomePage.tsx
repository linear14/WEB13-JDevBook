import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { imageViewerState as ivState } from 'recoil/store';

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
  InitSocket,
  AlertModal
} from 'components/common';

const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 56px;
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
  const [imageViewerState, setImageViewerState] = useRecoilState(ivState);
  return (
    <HomePageContainer>
      <InitUserData />
      <InitSocket />
      <AlertModal />
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
