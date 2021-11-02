import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ProfilePhoto } from '..';

const InfoSideBarContainer = styled.div`
  height: 200px;
  width: inherit;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
`;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 35px 50px 0 50px;
`;

const UserName = styled.p`
  font-size: large;
  font-weight: bold;
  margin: 20px 20px;
`;

const SolvedTitle = styled.div`
  font-weight: bold;
  margin: 10px 50px;
`;

const SolvedBarGraph = styled.div`
  height: 20px;
  background: #ccc;
  border-radius: 40px;
  margin: 0 50px;
`;

const GraphAnimation = keyframes`
  0% {
    width: 0;
    color: rgba(255, 255, 255, 0);
  }
  50% {
    color: rgba(255, 255, 255, 1);
  }
  100% {
    width: 75%;
  }
`;

const InnerBarGraph = styled.span`
  display: block;
  width: 75%;
  height: 20px;
  line-height: 20px;
  text-align: right;
  background: #87d474;
  border-radius: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  color: white;
  font-size: small;
  font-weight: 600;
  animation: ${GraphAnimation} 1.5s 1;
`;

const InfoSideBar: React.FC = () => {
  return (
    <InfoSideBarContainer>
      <ProfileWrap>
        <ProfilePhoto />
        <UserName>UserName</UserName>
      </ProfileWrap>
      <SolvedTitle>문제 푼 수</SolvedTitle>
      <SolvedBarGraph>
        <InnerBarGraph>75%</InnerBarGraph>
      </SolvedBarGraph>
    </InfoSideBarContainer>
  );
};

export default InfoSideBar;
