import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { imageViewerState, profileState, userDataStates } from 'recoil/store';
import palette from 'theme/palette';
import fetchApi from 'api/fetch';

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
import { PostWriter, ImageViewer } from 'components/HomePage';
import {
  ProfileBar,
  ProfileCover,
  InitProfileData,
  PostList
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
  width: calc(100vw - 680px);
  min-width: 720px;
  margin: 0 10px;

  display: ${(props) => (props.contentsState ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 100%;
  min-width: 720px;
  max-width: 908px;
  flex: 1;

  display: flex;
`;

const InfoContainer = styled.div`
  width: 366px;
  box-sizing: border-box;
  padding-right: 6px;
`;

const PostContainer = styled.div`
  width: 544px;
  box-sizing: border-box;
  padding-left: 6px;
`;

const ProfilePage: React.FC<RouteComponentProps<{ username: string }>> = ({
  match
}) => {
  const userData = useRecoilValue(userDataStates);
  const profileData = useRecoilValue(profileState);
  const resetProfileData = useResetRecoilState(profileState);
  const imageViewer = useRecoilValue(imageViewerState);
  const [myProfile, setMyProfile] = useState<boolean>(false);

  useEffect(() => {
    if (userData.name === profileData.nickname) setMyProfile(true);
    else setMyProfile(false);
  }, [profileData, userData]);

  useEffect(() => {
    return () => resetProfileData();
  }, []);

  const [imgsrc, setImgsrc] = useState('');

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
      <InitProfileData userName={match.params.username} />
      <InitSocket />
      <LoadingModal
        modalState={profileData.idx === 0 || userData.name === ''}
      />
      <Gnb />
      <PageLayout>
        <SideBar isLeft={true}>
          <InfoSideBar />
          <GroupSideBar />
        </SideBar>
        <ContentsContainer contentsState={true}>
          <ProfileCover src={imgsrc} profileName={match.params.username} />
          <ProfileBar />
          <InnerContainer>
            <InfoContainer></InfoContainer>
            <PostContainer>
              {myProfile ? <PostWriter /> : ''}
              <PostList username={match.params.username} />
            </PostContainer>
          </InnerContainer>
        </ContentsContainer>
        <SideBar isLeft={false}>
          <ChatSideBar />
        </SideBar>
      </PageLayout>
      {imageViewer.isOpen && <ImageViewer />}
    </ProfilePageContainer>
  );
};

export default ProfilePage;
