import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { GroupNavState, rightModalStates } from 'recoil/store';

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
import {
  ProblemList,
  GroupNavBar,
  InitGroupData,
  About,
  GroupChat
} from 'components/GroupPage';

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

const GroupPage: React.FC<RouteComponentProps<{ groupidx: string }>> = ({
  match
}) => {
  const groupNavState = useRecoilValue(GroupNavState);
  const rightModalState = useRecoilValue(rightModalStates);

  return (
    <GroupPageContainer>
      <GlobalStyle />
      <InitUserData />
      <InitGroupData groupIdx={Number(match.params.groupidx)} />
      <InitSocket />
      <Gnb type="group" />
      <SideBar isLeft={true}>
        <InfoSideBar />
        <GroupSideBar />
      </SideBar>
      <ContentsContainer>
        <img src={os} alt="그룹 이미지" />
        <GroupNavBar />
        <About />
        <ProblemList groupIdx={Number(match.params.groupidx)} />
      </ContentsContainer>
      <SideBar isLeft={false}>
        <ChatSideBar />
        <GroupChat groupIdx={Number(match.params.groupidx)} />
      </SideBar>
    </GroupPageContainer>
  );
};

export default GroupPage;
