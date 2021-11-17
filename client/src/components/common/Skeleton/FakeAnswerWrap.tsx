import React from 'react';
import styled, { css } from 'styled-components';

const FakeBodyContainer = styled.div`
  width: 100%;
  padding: 0px 24px;
  box-sizing: border-box;
  display: flex;

  div {
    flex: 1;
    height: 64px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 12px;

    & + div {
      margin-left: 24px;
    }
  }
`;

const FakeAnswerWrap = () => {
  return (
    <>
      <FakeBodyContainer>
        <div />
        <div />
      </FakeBodyContainer>
    </>
  );
};

export default FakeAnswerWrap;
