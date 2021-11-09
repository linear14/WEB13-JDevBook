import React from 'react';
import styled, { css } from 'styled-components';
import { PostImageBoxProps, PostImageBoxUrl } from 'utils/types';

const getImageSize = (url: string) => {
  const img = new Image();
  img.src = url;
  return [url, img.width, img.height];
};

const FullImageBox = styled.div<PostImageBoxUrl>`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background: url(${({ imageUrl }) => imageUrl});
`;

const PostImageBox = ({ images }: PostImageBoxProps) => {
  const imageLength = images.length;

  if (imageLength === 1) {
    console.log(getImageSize(images[0]));
    return <FullImageBox imageUrl={images[0]} />;
  }
  return <div></div>;
};

export default PostImageBox;
