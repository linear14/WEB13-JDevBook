import React from 'react';
import styled from 'styled-components';

import fetchApi from 'api/fetch';
import { Quiz } from '..';

const QuizListContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 48px;
`;

const QuizList = () => {
  return (
    <QuizListContainer>
      {Array(10)
        .fill(undefined)
        .map(() => (
          <Quiz />
        ))}
    </QuizListContainer>
  );
};

export default QuizList;
