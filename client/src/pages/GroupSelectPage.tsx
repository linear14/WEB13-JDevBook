import styled, { createGlobalStyle, css } from 'styled-components';

import {
  FakeSideBar,
  InitUserData,
  InitSocket,
  FakeGnb
} from 'components/common';
import { GroupSelectTitle, GroupSelectList } from 'components/GroupSelectPage';

const GlobalStyle = createGlobalStyle`
  ${({}) => {
    return css`
      body {
        background-color: ${(props) => props.theme.lightgray};
      }
    `;
  }}
`;

const GroupSelectPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentsContainer = styled.div`
  width: calc(100vw - 340px);
  min-width: 720px;
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
      <FakeGnb />
      <PageLayout>
        <FakeSideBar />
        <ContentsContainer>
          <GroupSelectTitle />
          <GroupSelectList />
        </ContentsContainer>
      </PageLayout>
    </GroupSelectPageContainer>
  );
};

export default GroupSelectPage;
