import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { groupState } from 'recoil/store';
import { defaultGroup } from 'images/groupimg';
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

  img {
    width: 100%;
    min-width: 720px;
    max-width: 908px;
    height: 320px;
    object-fit: cover;
  }
`;

const GroupPage: React.FC<RouteComponentProps<{ groupidx: string }>> = ({
  match
}) => {
  const groupData = useRecoilValue(groupState);
  const resetGroupData = useResetRecoilState(groupState);

  useEffect(() => {
    return () => resetGroupData();
  }, []);

  return (
    <GroupPageContainer>
      <GlobalStyle />
      <InitUserData />
      <InitGroupData groupIdx={Number(match.params.groupidx)} />
      <InitSocket />
      <LoadingModal modalState={groupData.idx === 0} />
      <Gnb type="group" />
      <PageLayout>
        <SideBar isLeft={true}>
          <InfoSideBar />
          <GroupSideBar />
        </SideBar>
        <ContentsContainer contentsState={groupData.idx !== 0}>
          <img src={groupData.cover || defaultGroup} alt="그룹 이미지" />
          <GroupNavBar />
          <About />
          <ProblemList groupIdx={Number(match.params.groupidx)} />
        </ContentsContainer>
        <SideBar isLeft={false}>
          <ChatSideBar />
          <GroupChat groupIdx={Number(match.params.groupidx)} />
        </SideBar>
      </PageLayout>
    </GroupPageContainer>
  );
};

export default GroupPage;
