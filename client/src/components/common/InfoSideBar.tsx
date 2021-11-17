import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { solvedProblemState, userDataStates } from 'recoil/store';
import { useRecoilValue } from 'recoil';

import palette from 'theme/palette';

import { ProfilePhoto } from 'components/common';
import fetchApi from 'api/fetch';

const InfoSideBarContainer = styled.div`
  height: 200px;
  width: inherit;
  background: ${palette.white};
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 3px 3px 3px;
`;

const ProfileWrap = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 35px 50px 0 50px;
  text-decoration: none;
  color: ${palette.black};

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
  height: 25px;
  background: ${palette.gray};
  border-radius: 40px;
  margin: 0 50px;
`;

const GraphAnimation = (solvedRate: number) => keyframes`
  0% {
    width: 0;
    color: rgba(255, 255, 255, 0);
  }
  50% {
    color: rgba(255, 255, 255, 1);
  }
  100% {
    width: ${solvedRate}%;
  }
`;

const InnerBarGraph = styled.span<{ solvedRate: number }>`
  display: block;
  width: ${(props) => props.solvedRate}%;
  height: 25px;
  line-height: 25px;
  text-align: right;
  background: ${palette.green};
  border-radius: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  color: ${palette.white};
  font-size: small;
  font-weight: 600;
  animation: ${(props) => GraphAnimation(props.solvedRate)} 1.5s 1;
`;

const InfoSideBar = () => {
  const userdata = useRecoilValue(userDataStates);
  const solvedProblemCount = useRecoilValue(solvedProblemState).length;
  const [totalProblemCount, setTotalProblemCount] = useState<number>(0);
  const [solvedRate, setSolvedRate] = useState<number>(0);

  // 현재 그룹에 추가로 가입된 경우에는 값이 변경되지 않음 (그룹 관리 recoil 생기면 들어갈듯)
  useEffect(() => {
    setSolvedRate(
      totalProblemCount === 0
        ? 0
        : Number(((solvedProblemCount / totalProblemCount) * 100).toFixed(1))
    );
  }, [solvedProblemCount, totalProblemCount]);

  useEffect(() => {
    const initProblemCount = async () => {
      const problems = await fetchApi.getProblems();
      setTotalProblemCount(problems.length);
    };
    initProblemCount();
  }, []);

  return (
    <InfoSideBarContainer>
      <ProfileWrap to="/profile/shin">
        <ProfilePhoto src="" />
        <p>{userdata.name}</p>
      </ProfileWrap>
      <SolvedTitle>문제 정답률</SolvedTitle>
      <SolvedBarGraph>
        <InnerBarGraph solvedRate={solvedRate}>
          {totalProblemCount !== 0 && `${solvedRate}%`}
        </InnerBarGraph>
      </SolvedBarGraph>
    </InfoSideBarContainer>
  );
};

export default InfoSideBar;
