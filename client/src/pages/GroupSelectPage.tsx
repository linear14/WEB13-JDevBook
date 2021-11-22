import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import palette from 'theme/palette';

import {
  Gnb,
  SideBar,
  InfoSideBar,
  GroupSideBar,
  InitUserData,
  InitSocket
} from 'components/common';
import { GroupSelectTitle, GroupSelectList } from 'components/GroupSelectPage';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${palette.lightgray};
  }
`;

const GroupSelectPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentsContainer = styled.div`
  position: relative;
  top: 56px;
  width: 1220px;
  height: 1000px;
  box-sizing: border-box;
  padding: 30px 50px;

  display: flex;
  flex-direction: column;
`;

const GroupSelectPage = () => {
  return (
    <GroupSelectPageContainer>
      <GlobalStyle />
      <InitUserData />
      <InitSocket />
      <Gnb type="group" />
      <SideBar isLeft={true}>
        <InfoSideBar />
        <GroupSideBar />
      </SideBar>
      <ContentsContainer>
        <GroupSelectTitle />
        <GroupSelectList />
      </ContentsContainer>
    </GroupSelectPageContainer>
  );
};

export default GroupSelectPage;
