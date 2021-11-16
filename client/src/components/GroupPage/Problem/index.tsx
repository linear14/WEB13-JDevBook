import React from 'react';
import styled from 'styled-components';

import palette from 'theme/palette';
import { IProblem } from 'types/group';

const ProblemContainer = styled.div`
  width: 680px;
  min-width: 680px;
  height: 240px;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  margin-top: 24px;
  background-color: ${palette.white};

  p {
    margin: 0;
  }
`;

const Problem = ({ problem }: { problem: IProblem }) => {
  return <ProblemContainer>{problem.question}</ProblemContainer>;
};

export default Problem;
