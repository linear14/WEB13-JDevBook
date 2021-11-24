import fetchApi from 'api/fetch';
import useAlertModal from 'hooks/useAlertModal';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GroupNavState, solvedProblemState } from 'recoil/store';
import styled from 'styled-components';

import palette from 'theme/palette';
import { IProblem } from 'types/problem';
import Explanation from './Explanation';

const ProblemContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  margin-top: 24px;
  background-color: ${palette.white};
  box-sizing: border-box;

  * {
    box-sizing: inherit;
  }

  p {
    margin: 0;
  }

  &:first-child {
    margin-top: 16px;
  }
`;

const GroupTitle = styled.div`
  color: #9b9b9b;
  font-size: 14px;
  padding: 24px 24px 0px;
  letter-spacing: 0.6px;
`;

const QuestionBox = styled.div`
  position: relative;
  padding: 16px 24px 0px;
  border-radius: 8px;
  line-height: 2;
`;

const AnswerWrap = styled.div<{ isSolvedNow: boolean }>`
  display: flex;
  padding: 24px;
  border-bottom: ${({ isSolvedNow }) =>
    isSolvedNow && `1px solid ${palette.lightgray}`};
`;

const AnswerButton = styled.div`
  flex: 1;
  height: 64px;
  border-radius: 8px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 12px;
  transition: 0.2s ease-out;

  & + & {
    margin-left: 24px;
  }

  &:hover {
    color: white;
  }

  &:active {
    color: white;
    font-size: 22px;
    box-shadow: none;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 3px 12px;
  }
`;

const RightButton = styled(AnswerButton)`
  &::after {
    content: 'O';
  }

  &:hover {
    background-color: lightblue;
  }

  &:active {
    background-color: #88c3d6;
  }
`;

const WrongButton = styled(AnswerButton)`
  &::after {
    content: 'X';
  }

  &:hover {
    background-color: pink;
  }

  &:active {
    background-color: #e499a5;
  }
`;

const SolvedLabel = styled.div`
  width: 100%;
  height: 36px;
  background: ${palette.green};
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: white;
  letter-spacing: 1px;

  &::after {
    content: '풀었던 문제';
  }
`;

const Problem = ({
  problem,
  isHome
}: {
  problem: IProblem;
  isHome?: boolean;
}) => {
  const groupNavState = useRecoilValue(GroupNavState);
  const [solvedProblems, setSolvedProblems] =
    useRecoilState(solvedProblemState);
  const showAlert = useAlertModal();
  const [isSolvedNow, setSolvedNow] = useState<boolean>(false);

  const handleAnswer = (selected: boolean) => {
    if (problem.answer === selected) {
      showAlert('정답입니다. 뛰어난 실력이시군요!');
      setSolvedNow(true);
      if (!solvedProblems.map((item) => item.idx).includes(problem.idx)) {
        setSolvedProblems(
          solvedProblems.concat({
            idx: problem.idx,
            groupIdx: problem.groupidx
          })
        );
        fetchApi.insertSolvedProblem(problem.idx);
      }
    } else {
      showAlert('오답입니다. 더 공부 하세요!', palette.alert);
    }
  };

  useEffect(() => {
    return () => {
      setSolvedNow(false);
    };
  }, [groupNavState.problem]);

  return (
    <ProblemContainer>
      {solvedProblems.map((item) => item.idx).includes(problem.idx) && (
        <SolvedLabel />
      )}
      {isHome && (
        <GroupTitle>[{problem.BTGroupgroupidx.title}] 그룹의 문제</GroupTitle>
      )}
      <QuestionBox>{problem.question}</QuestionBox>
      <AnswerWrap isSolvedNow={isSolvedNow}>
        <RightButton onClick={() => handleAnswer(true)} />
        <WrongButton onClick={() => handleAnswer(false)} />
      </AnswerWrap>
      {isSolvedNow && problem.explanation && (
        <Explanation explanation={problem.explanation} />
      )}
    </ProblemContainer>
  );
};

export default Problem;
