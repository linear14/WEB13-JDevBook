import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { userDataStates, rateState } from 'recoil/store';
import palette from 'theme/palette';

import { ProfilePhoto } from 'components/common';

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

const GraphAnimation = (prevRate: number, solvedRate: number) => keyframes`
  0% {
    width: ${prevRate}%;
  }
  100% {
    width: ${solvedRate}%;
  }
`;

const InnerBarGraph = styled.span<{ prevRate: number; solvedRate: number }>`
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
  animation: ${(props) => GraphAnimation(props.prevRate, props.solvedRate)} 1.5s
    1;
`;

const InfoSideBar = () => {
  const userdata = useRecoilValue(userDataStates);
  const [rate, setRate] = useRecoilState(rateState);

  const prevRateUpdate = (e: React.AnimationEvent) => {
    setRate({ ...rate, prevRate: rate.solvedRate });
  };

  useEffect(() => {
    const solvedRate = Number(((123 / 155) * 100).toFixed(1));
    setRate({ ...rate, solvedRate: solvedRate });
  }, []);

  return (
    <InfoSideBarContainer>
      <ProfileWrap to="/profile/shin">
        <ProfilePhoto src="" />
        <p>{userdata.name}</p>
      </ProfileWrap>
      <SolvedTitle>문제 푼 수</SolvedTitle>
      <SolvedBarGraph>
        <InnerBarGraph
          prevRate={rate.prevRate}
          solvedRate={rate.solvedRate}
          onAnimationEnd={prevRateUpdate}
        >
          {rate.solvedRate}%
        </InnerBarGraph>
      </SolvedBarGraph>
    </InfoSideBarContainer>
  );
};

export default InfoSideBar;
