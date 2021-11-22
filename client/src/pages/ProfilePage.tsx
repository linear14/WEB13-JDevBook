import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';

import palette from 'theme/palette';

import {
  Gnb,
  SideBar,
  InfoSideBar,
  ChatSideBar,
  GroupSideBar,
  InitUserData,
  InitSocket
} from 'components/common';
import { ProfileBar, ProfileCover, PostList } from 'components/ProfilePage';
import { PostWriterModal } from 'components/HomePage';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${palette.lightgray};
  }
`;

const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentsContainer = styled.div<{ contentsState: boolean }>`
  width: 100%;
  min-width: 720px;
  margin: 0 10px;

  display: ${(props) => (props.contentsState ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
`;

const ProfilePage: React.FC<RouteComponentProps<{ username: string }>> = ({
  match
}) => {
  return (
    <ProfilePageContainer>
      <GlobalStyle />
      <InitUserData />
      <InitSocket />
      <Gnb />
      <PageLayout>
        <SideBar isLeft={true}>
          <InfoSideBar />
          <GroupSideBar />
        </SideBar>
        <ContentsContainer contentsState={true}>
          <ProfileCover src="" />
          <ProfileBar />
          <PostList username={match.params.username} />
        </ContentsContainer>
        <SideBar isLeft={false}>
          <ChatSideBar />
        </SideBar>
      </PageLayout>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
