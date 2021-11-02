import React, { useState } from 'react';
import styled from 'styled-components';
import { Gnb, SideBar, InfoSideBar, ChatSideBar, GroupSideBar } from '../components';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentsWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HomePage = () => {
  const [rightModalFlag, setRightModalFlag] = useState<boolean>(false);

  return (
    <HomePageContainer>
      <Gnb type="home" rightModalFlag={rightModalFlag} setRightModalFlag={setRightModalFlag}/>
      <ContentsWrap>
        <SideBar isLeft={true}>
          <InfoSideBar />
          <GroupSideBar />
        </SideBar>
        <SideBar isLeft={false}>
          <ChatSideBar rightModalFlag={rightModalFlag}/>
        </SideBar>
      </ContentsWrap>
    </HomePageContainer>
  );
};

export default HomePage;
