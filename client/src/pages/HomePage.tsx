import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Gnb,
  SideBar,
  InfoSideBar,
  ChatSideBar,
  GroupSideBar
} from '../components';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentsWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HomePage = () => {
  const [flagObj, setFlagObj] = useState<any>({
    rightModalFlag: false,
    myPageFlag: false,
    messageFlag: false,
    alarmFlag: false,
    selectorFlag: false
  });

  const { rightModalFlag, myPageFlag, messageFlag, alarmFlag, selectorFlag } =
    flagObj;
  const changeFlag = (e: any) => {
    if (!rightModalFlag || !flagObj[e]) {
      setFlagObj({
        rightModalFlag: true,
        myPageFlag: false,
        messageFlag: false,
        alarmFlag: false,
        selectorFlag: false,
        [e]: true
      });
    } else {
      setFlagObj({
        ...flagObj,
        rightModalFlag: false,
        [e]: false
      });
    }
  };

  return (
    <HomePageContainer>
      <Gnb type="home" flagObj={flagObj} changeFlag={changeFlag} />
      <ContentsWrap>
        <SideBar isLeft={true}>
          <InfoSideBar />
          <GroupSideBar />
        </SideBar>
        <SideBar isLeft={false}>
          <ChatSideBar flagObj={flagObj} />
        </SideBar>
      </ContentsWrap>
    </HomePageContainer>
  );
};

export default HomePage;
