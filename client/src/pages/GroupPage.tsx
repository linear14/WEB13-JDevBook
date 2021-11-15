import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import palette from 'theme/palette';

import {
  Gnb,
  SideBar,
  InfoSideBar,
  ChatSideBar,
  GroupSideBar,
  InitUserData
} from '../components/common';

const GlobalStyle = createGlobalStyle`
  * {
    font-weight: bold;
    
    ::placeholder,
    ::-webkit-input-placeholder {
      font-family: 'Noto Sans KR';
    }
    :-ms-input-placeholder {
      font-family: 'Noto Sans KR';
    }
  }

  body {
    background-color: ${palette.lightgray};
  }
`;

const GroupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentsWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GroupPage = () => {
  return (
    <>
      <GlobalStyle />
      <GroupPageContainer>
        <InitUserData />
        <Gnb type="group" />
        <ContentsWrap>
          <SideBar isLeft={true}>
            <InfoSideBar />
            <GroupSideBar />
          </SideBar>
          <SideBar isLeft={false}>
            <ChatSideBar />
          </SideBar>
        </ContentsWrap>
      </GroupPageContainer>
    </>
  );
};

export default GroupPage;
