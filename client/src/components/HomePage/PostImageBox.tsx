import React from 'react';
import styled, { css } from 'styled-components';
import palette from 'theme/palette';
import imageUtil from 'utils/imageUtil';
import {
  PostImageBoxProps,
  PostImageBoxStyle,
  PostImageInfo
} from 'utils/types';

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

const SkeletonBox = styled.div`
  width: 680px;
  height: 680px;
  background: ${palette.lightgray};
`;

const PostImageBox = ({ imageCount, images }: PostImageBoxProps) => {
  if (imageCount >= 1 && images === null) {
    return <SkeletonBox />;
  }

  const postImages = images as PostImageInfo[];

  if (imageCount === 1) {
    const { url, originalWidth, originalHeight } = postImages[0];
    const [width, height] = imageUtil.getImageFitSize(
      680,
      originalWidth,
      originalHeight
    );
    return <ImageBox src={url} width={width} height={height} />;
  }
  if (imageCount === 2) {
    const { url: url1 } = postImages[0];
    const { url: url2 } = postImages[1];
    return (
      <FlexWrap>
        <ImageBox src={url1} width={340} height={340} rightBorder />
        <ImageBox src={url2} width={340} height={340} leftBorder />
      </FlexWrap>
    );
  }
  if (imageCount === 3) {
    const { url: url1, originalWidth, originalHeight } = postImages[0];
    const { url: url2 } = postImages[1];
    const { url: url3 } = postImages[2];
    if (originalWidth >= originalHeight) {
      return (
        <div>
          <ImageBox src={url1} width={680} height={340} bottomBorder />
          <FlexWrap>
            <ImageBox
              src={url2}
              width={340}
              height={340}
              topBorder
              rightBorder
            />
            <ImageBox
              src={url3}
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
          <ImageBox src={url1} width={340} height={680} rightBorder />
          <div>
            <ImageBox
              src={url2}
              width={340}
              height={340}
              leftBorder
              bottomBorder
            />
            <ImageBox
              src={url3}
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
