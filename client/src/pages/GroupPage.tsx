import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { os } from 'images/groupimg';
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
import { ProblemList, GroupNavBar } from 'components/GroupPage';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${palette.lightgray};
  }
`;

const GroupPageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 56px;
`;

const ContentsContainer = styled.div`
  position: relative;
  top: 56px;
  width: 908px;
  height: 1000px;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
    height: 320px;
    object-fit: cover;
  }
`;

const GroupPage = () => {
  return (
    <GroupPageContainer>
      <GlobalStyle />
      <InitUserData />
      <InitSocket />
      <Gnb type="group" />
      <SideBar isLeft={true}>
        <InfoSideBar />
        <GroupSideBar />
      </SideBar>
      <ContentsContainer>
        <img src={os} alt="그룹 이미지" />
        <GroupNavBar />
        <ProblemList />
      </ContentsContainer>
      <SideBar isLeft={false}>
        <ChatSideBar />
      </SideBar>
    </GroupPageContainer>
  );
};

export default GroupPage;
