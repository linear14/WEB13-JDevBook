import React, { useEffect, useState } from 'react';
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
import { ProfileBar, ProfileCover } from 'components/ProfilePage';
import fetchApi from 'api/fetch';
import { useRecoilValue } from 'recoil';
import { userDataStates } from 'recoil/store';

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
  const [imgsrc, setImgsrc] = useState('');
  const userData = useRecoilValue(userDataStates);

  useEffect(() => {
    (async () => {
      const { data: profile, error } = await fetchApi.getProfile(
        match.params.username
      );
      if (!error) {
        setImgsrc(profile.cover);
      }
    })();
  }, [match.params.username]);

  useEffect(() => {
    if (match.params.username === userData.name) setImgsrc(userData.cover);
  }, [userData.cover]);

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
          <ProfileCover src={imgsrc} profileName={match.params.username} />
          <ProfileBar profileName={match.params.username} />
        </ContentsContainer>
        <SideBar isLeft={false}>
          <ChatSideBar />
        </SideBar>
      </PageLayout>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
