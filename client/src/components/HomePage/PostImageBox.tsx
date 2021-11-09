import React from 'react';
import styled, { css } from 'styled-components';
import { PostImageBoxProps, PostImageBoxStyle } from 'utils/types';

const testImages = [
  'https://scontent-gmp1-1.xx.fbcdn.net/v/t1.6435-9/p180x540/253034808_4585841878126326_1849225643692170248_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=0debeb&_nc_ohc=fqBMTdIQhwEAX-lrcfc&_nc_ht=scontent-gmp1-1.xx&oh=921cc075668d73897e9a927184522887&oe=61ADCD65',
  'https://scontent-gmp1-1.xx.fbcdn.net/v/t1.6435-9/p526x296/246049353_4538255959586403_8626097602648069480_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=d9SCDFgxhYEAX_MUoX0&_nc_ht=scontent-gmp1-1.xx&oh=ef9d5b9df4101b41819cb4858f4d9929&oe=61AF0498',
  'https://images.unsplash.com/photo-1636329576110-64c2ce16e7c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80'
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

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ImageBox = styled.img<PostImageBoxStyle>`
  display: block;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-sizing: border-box;

  ${({ leftBorder, rightBorder, topBorder, bottomBorder }) => css`
    border-left: ${leftBorder && `1px solid white`};
    border-right: ${rightBorder && `1px solid white`};
    border-top: ${topBorder && `1px solid white`};
    border-bottom: ${bottomBorder && `1px solid white`};
  `}
`;

const PostImageBox = ({ images }: PostImageBoxProps) => {
  const imageLength = images.length;

  if (imageLength === 1) {
    const [url, originalWidth, originalHeight] = getImageSize(images[0]);
    const [width, height] = getImageFitSize(680, originalWidth, originalHeight);
    return <ImageBox src={url} width={width} height={height} />;
  }
  if (imageLength === 2) {
    return (
      <FlexWrap>
        <ImageBox src={images[0]} width={340} height={340} rightBorder />
        <ImageBox src={images[1]} width={340} height={340} leftBorder />
      </FlexWrap>
    );
  }
  if (imageLength === 3) {
    const [url, originalWidth, originalHeight] = getImageSize(images[0]);
    if (originalWidth >= originalHeight) {
      return (
        <div>
          <ImageBox src={images[0]} width={680} height={340} bottomBorder />
          <FlexWrap>
            <ImageBox
              src={images[1]}
              width={340}
              height={340}
              topBorder
              rightBorder
            />
            <ImageBox
              src={images[2]}
              width={340}
              height={340}
              topBorder
              leftBorder
            />
          </FlexWrap>
        </div>
      );
    } else {
      return (
        <FlexWrap>
          <ImageBox src={images[0]} width={340} height={680} rightBorder />
          <div>
            <ImageBox
              src={images[1]}
              width={340}
              height={340}
              leftBorder
              bottomBorder
            />
            <ImageBox
              src={images[2]}
              width={340}
              height={340}
              leftBorder
              topBorder
            />
          </div>
        </FlexWrap>
      );
    }
  }
  return <div></div>;
};

export default PostImageBox;
