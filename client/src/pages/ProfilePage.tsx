import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { profileState } from 'recoil/store';
import palette from 'theme/palette';

import {
  Gnb,
  SideBar,
  InfoSideBar,
  ChatSideBar,
  GroupSideBar,
  InitUserData,
  InitSocket,
  LoadingModal
} from 'components/common';
import {
  ProfileBar,
  ProfileCover,
  InitProfileData
} from 'components/ProfilePage';

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
  const profileData = useRecoilValue(profileState);
  const resetProfileData = useResetRecoilState(profileState);

  useEffect(() => {
    return () => resetProfileData();
  }, []);

  return (
    <ProfilePageContainer>
      <GlobalStyle />
      <InitUserData />
      <InitProfileData userName={match.params.username} />
      <InitSocket />
      <LoadingModal modalState={profileData.idx === 0} />
      <Gnb />
      <PageLayout>
        <SideBar isLeft={true}>
          <InfoSideBar />
          <GroupSideBar />
        </SideBar>
        <ContentsContainer contentsState={true}>
          <ProfileCover src={profileData.cover || ''} />
          <ProfileBar />
        </ContentsContainer>
        <SideBar isLeft={false}>
          <ChatSideBar />
        </SideBar>
      </PageLayout>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
