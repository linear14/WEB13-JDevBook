import fetchApi from 'api/fetch';
import useAlertModal from 'hooks/useAlertModal';
import React from 'react';
import { useRecoilState } from 'recoil';
import { solvedProblemState } from 'recoil/store';
import styled from 'styled-components';

import { IProblem } from 'types/problem';

const ProblemContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  margin-top: 24px;
  background-color: ${(props) => props.theme.white};
  box-sizing: border-box;
  padding-bottom: 32px;

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
  color: ${(props) => props.theme.black};
  position: relative;
  padding: 16px 24px 0px;
  border-radius: 8px;
  line-height: 2;
`;

const AnswerWrap = styled.div`
  display: flex;
  margin: 24px 24px 0px;
`;

const AnswerButton = styled.div`
  flex: 1;
  height: 64px;
  border-radius: 8px;
  color: ${(props) => props.theme.black};
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
    color: ${(props) => props.theme.white};
  }

  &:active {
    color: ${(props) => props.theme.white};
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
  height: 48px;
  background: ${(props) => props.theme.green};
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: ${(props) => props.theme.white};
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
  const [solvedProblems, setSolvedProblems] =
    useRecoilState(solvedProblemState);
  const showAlert = useAlertModal();

  const handleAnswer = (selected: boolean) => {
    if (problem.answer === selected) {
      showAlert('정답입니다.');
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
      showAlert('오답입니다.', true);
    }
  };

  return (
    <ProblemContainer>
      {solvedProblems.map((item) => item.idx).includes(problem.idx) && (
        <SolvedLabel />
      )}
      {isHome && (
        <GroupTitle>[{problem.BTGroupgroupidx.title}] 그룹의 문제</GroupTitle>
      )}
      <QuestionBox>{problem.question}</QuestionBox>
      <AnswerWrap>
        <RightButton onClick={() => handleAnswer(true)} />
        <WrongButton onClick={() => handleAnswer(false)} />
      </AnswerWrap>
    </ProblemContainer>
  );
};

export default Problem;
