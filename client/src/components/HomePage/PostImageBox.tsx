import React from 'react';
import styled, { css } from 'styled-components';
import { PostImageBoxProps, PostImageBoxSize } from 'utils/types';

const testImages = [
  'https://scontent-gmp1-1.xx.fbcdn.net/v/t1.6435-9/p180x540/253034808_4585841878126326_1849225643692170248_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=0debeb&_nc_ohc=fqBMTdIQhwEAX-lrcfc&_nc_ht=scontent-gmp1-1.xx&oh=921cc075668d73897e9a927184522887&oe=61ADCD65',
  'https://scontent-gmp1-1.xx.fbcdn.net/v/t1.6435-9/p526x296/246049353_4538255959586403_8626097602648069480_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=d9SCDFgxhYEAX_MUoX0&_nc_ht=scontent-gmp1-1.xx&oh=ef9d5b9df4101b41819cb4858f4d9929&oe=61AF0498'
];

const getImageSize = (url: string): [string, number, number] => {
  const img = new Image();
  img.src = url;
  return [url, Number(img.width), Number(img.height)];
};

const getImageFitSize = (
  target: number = 680,
  width: number,
  height: number
) => {
  if (width === height) {
    return [target, target];
  }
  if (width > height && width > target) {
    return [target, Math.floor((height * target) / width)];
  } else if (width < height && height > target) {
    return [Math.floor((width * target) / height), target];
  } else {
    return [width, height];
  }
};

const FullImageBox = styled.img<PostImageBoxSize>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const PostImageBox = ({ images }: PostImageBoxProps) => {
  const imageLength = images.length;

  if (imageLength === 1) {
    const [url, originalWidth, originalHeight] = getImageSize(testImages[0]);
    const [width, height] = getImageFitSize(680, originalWidth, originalHeight);
    return <FullImageBox src={url} width={width} height={height} />;
  }
  return <div></div>;
};

export default PostImageBox;
