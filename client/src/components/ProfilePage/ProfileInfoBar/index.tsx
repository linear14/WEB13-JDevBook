import React, { useCallback, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  myJoinedGroupState,
  solvedProblemState,
  rateState,
  profileState
} from 'recoil/store';
import { IGroup } from 'types/group';
import palette from 'theme/palette';
import fetchApi from 'api/fetch';

const ProfileBarContainer = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 24px;
  box-sizing: border-box;
  padding: 16px;

  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  background-color: ${palette.white};
`;

const SolvedTitle = styled.div`
  font-weight: bold;
  margin-bottom: 12px;
`;

const NoGroup = styled.div`
  color: ${palette.darkgray};

  &:after {
    content: '가입된 그룹이 없습니다';
  }
`;

const SolvedBarGraph = styled.div`
  height: 25px;
  background: ${palette.gray};
  border-radius: 40px;
`;

const GraphAnimation = (solvedRate: number) => keyframes`
  0% {
    width: 0%;
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

const ProfileInfoBar = () => {
  const profileData = useRecoilValue(profileState);
  const [joinedGroups, setJoinedGroups] = useState<number[]>([1]);
  const [solvedProblem, setSolvedProblem] = useState<
    { idx: number; groupidx: number }[]
  >([]);
  const [rate, setRate] = useState<number>(0);

  // const getSolvedRate = useCallback(() => {
  //   const solvedLength = solvedProblem.filter((item) =>
  //     joinedGroups?.includes(item.groupIdx)
  //   ).length;
  //   return rate.totalProblemsCount === 0
  //     ? 0
  //     : Number(((solvedLength / rate.totalProblemsCount) * 100).toFixed(1));
  // }, [solvedProblem, rate.totalProblemsCount, joinedGroups]);

  useEffect(() => {
    // const solvedRate = getSolvedRate();
    setRate(88);
  }, []);

  return (
    <ProfileBarContainer>
      <SolvedTitle>문제 정답률</SolvedTitle>
      {joinedGroups && joinedGroups.length === 0 && <NoGroup />}
      {joinedGroups && joinedGroups.length > 0 && (
        <SolvedBarGraph>
          <InnerBarGraph solvedRate={rate}>
            {rate !== 0 && `${rate}%`}
          </InnerBarGraph>
        </SolvedBarGraph>
      )}
    </ProfileBarContainer>
  );
};

export default ProfileInfoBar;
