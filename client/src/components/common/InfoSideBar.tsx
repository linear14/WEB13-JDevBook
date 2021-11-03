import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ProfilePhoto } from '..';
import { userData } from 'recoil/modal';
import { useRecoilState } from 'recoil';

const InfoSideBarContainer = styled.div`
  height: 200px;
  width: inherit;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 5px 5px 5px;
`;

const ProfileWrap = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 35px 50px 0 50px;
  text-decoration: none;
  color: black;

  p {
    font-size: large;
    font-weight: bold;
    margin: 20px 20px;
  }
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
  const [userdata, setUserdata] = useRecoilState(userData);
  useEffect(() => {
    async function fetchUserdata() {
      const name = await fetch('/api/data').then(res => res.json());
      setUserdata({username: name});
    }
    fetchUserdata();
    // 로그아웃 할 때 없애던지 vs home 못가게 하던지
  }, []);

  return (
    <InfoSideBarContainer>
      <ProfileWrap href="/profile">
        <ProfilePhoto src="" />
        <p>{userdata.username}</p>
      </ProfileWrap>
      <SolvedTitle>문제 푼 수</SolvedTitle>
      <SolvedBarGraph>
        <InnerBarGraph>75%</InnerBarGraph>
      </SolvedBarGraph>
    </InfoSideBarContainer>
  );
};

export default InfoSideBar;
