import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { groupState } from 'recoil/store';
import { os } from 'images/groupimg';
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
  ProblemList,
  GroupNavBar,
  InitGroupData,
  About
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

const ContentsContainer = styled.div<{ contentsState: boolean }>`
  position: relative;
  top: 56px;
  width: 908px;
  height: 1000px;

  display: ${(props) => (props.contentsState ? 'flex' : 'none')};
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
  const groupData = useRecoilValue(groupState);

  return (
    <GroupPageContainer>
      <GlobalStyle />
      <InitUserData />
      <InitGroupData groupIdx={Number(match.params.groupidx)} />
      <InitSocket />
      <LoadingModal modalState={groupData.idx === 0} />
      <Gnb type="group" />
      <SideBar isLeft={true}>
        <InfoSideBar />
        <GroupSideBar />
      </SideBar>
      <ContentsContainer contentsState={groupData.idx !== 0}>
        <img src={os} alt="그룹 이미지" />
        <GroupNavBar />
        <About />
        <ProblemList />
      </ContentsContainer>
      <SideBar isLeft={false}>
        <ChatSideBar />
      </SideBar>
    </GroupPageContainer>
  );
};

export default GroupPage;
