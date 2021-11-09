import React from 'react';
import styled, { css } from 'styled-components';
import { PostImageBoxProps, PostImageBoxUrl } from 'utils/types';

const FullImageBox = styled.div<PostImageBoxUrl>`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background: url(${({ imageUrl }) => imageUrl});
`;

const PostImageBox: React.FC<PostImageBoxProps> = ({ images }) => {
  const imageLength = images.length;

  if (imageLength === 1) {
    return <FullImageBox imageUrl={images[0]} />;
  }
  return <div></div>;
};

export default PostImageBox;
