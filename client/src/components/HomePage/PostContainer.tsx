import React from 'react';
import styled from 'styled-components';

import { PostContainerProps } from 'utils/types';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 680px;
  background-color: beige;
`;

const PostContainer = ({ children }: PostContainerProps) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default PostContainer;
