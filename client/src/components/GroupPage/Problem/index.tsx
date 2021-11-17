import fetchApi from 'api/fetch';
import React from 'react';
import { useRecoilState } from 'recoil';
import { solvedProblemState } from 'recoil/store';
import styled from 'styled-components';

import palette from 'theme/palette';
import style from 'theme/style';
import { IProblem } from 'types/problem';

const ProblemContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  margin-top: 24px;
  background-color: ${palette.white};
  padding-bottom: 24px;

  p {
    margin: 0;
  }
`;

const Body = styled.div`
  font-size: ${style.font.large};
  padding: ${style.padding.normal} ${style.padding.large} ${style.padding.large};
  box-sizing: border-box;
`;

const AnswerWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const RightButton = styled.div`
  width: 180px;
  height: 180px;
  background: lightblue;
  border-radius: 16px;
`;

const WrongButton = styled.div`
  width: 180px;
  height: 180px;
  background: pink;
  border-radius: 16px;
`;

const SolvedLabel = styled.div`
  width: 100%;
  height: 32px;
  background: ${palette.darkgreen};
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

const Problem = ({ problem }: { problem: IProblem }) => {
  const [solvedProblems, setSolvedProblems] =
    useRecoilState(solvedProblemState);

  const handleAnswer = (selected: boolean) => {
    if (problem.answer === selected) {
      alert('정답입니다.');
      if (!solvedProblems.includes(problem.idx)) {
        setSolvedProblems(solvedProblems.concat(problem.idx));
        fetchApi.insertSolvedProblem(problem.idx);
      }
    } else {
      alert('오답입니다.');
    }
  };

  return (
    <ProblemContainer>
      {solvedProblems.includes(problem.idx) && <SolvedLabel />}
      <Body>
        Q. {problem.question} ({problem.BTGroupgroupidx.title})
      </Body>
      <AnswerWrap>
        <RightButton onClick={() => handleAnswer(true)} />
        <WrongButton onClick={() => handleAnswer(false)} />
      </AnswerWrap>
    </ProblemContainer>
  );
};

export default Problem;
