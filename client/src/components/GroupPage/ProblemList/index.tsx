import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import fetchApi from 'api/fetch';
import { Problem } from '..';
import { IProblem } from 'types/group';

const ProblemListContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 48px;
`;

const ProblemList = () => {
  const [problemList, setProblemList] = useState<IProblem[]>([]);

  const fetchProblems = async (groupIdx: number) => {
    const result = await fetchApi.getProblems(groupIdx);
    setProblemList((prev) => prev.concat(result));
  };

  useEffect(() => {
    fetchProblems(1);
  }, []);

  return (
    <ProblemListContainer>
      {problemList.map((problem) => (
        <Problem key={problem.idx} problem={problem} />
      ))}
    </ProblemListContainer>
  );
};

export default ProblemList;
