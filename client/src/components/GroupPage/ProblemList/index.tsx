import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import fetchApi from 'api/fetch';
import { Problem } from '..';
import { IProblem } from 'types/problem';
import { Skeleton } from 'components/common';

const ProblemListContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 48px;
`;

const ProblemList = () => {
  const [problemList, setProblemList] = useState<IProblem[]>([]);
  const [isFetching, setFetching] = useState<boolean>(true);

  const fetchProblems = async (groupIdx: number) => {
    setFetching(true);
    const result = await fetchApi.getProblems(groupIdx);
    setProblemList((prev) => prev.concat(result));
    setFetching(false);
  };

  const getSkeletons = useCallback((count: number) => {
    return Array(count)
      .fill(undefined)
      .map((v, i) => {
        return <Skeleton key={`s${i}`} type="problem" />;
      });
  }, []);

  useEffect(() => {
    fetchProblems(1);
  }, []);

  return (
    <ProblemListContainer>
      {problemList.map((problem) => (
        <Problem key={problem.idx} problem={problem} />
      ))}
      {isFetching && getSkeletons(3)}
    </ProblemListContainer>
  );
};

export default ProblemList;
