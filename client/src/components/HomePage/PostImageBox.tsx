import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import palette from 'theme/palette';
import imageUtil from 'utils/imageUtil';
import {
  PostImageBoxProps,
  PostImageBoxStyle,
  PostImageBoxStyleWithSource,
  PostImageInfo
} from 'utils/types';
import { errorImage } from 'images';

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
`;

const HoverBox = styled.div`
  position: relative;

  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0;
  }

  &:active div {
    opacity: 0.25;
  }
`;

const SkeletonBox = styled.div`
  width: 680px;
  height: 680px;
  background: ${palette.lightgray};
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

const ActiveImageBox = (props: PostImageBoxStyleWithSource) => {
  const {
    src,
    width,
    height,
    leftBorder,
    rightBorder,
    topBorder,
    bottomBorder
  } = props;
  return (
    <HoverBox>
      <ImageBox
        src={src}
        width={width}
        height={height}
        leftBorder={leftBorder}
        rightBorder={rightBorder}
        topBorder={topBorder}
        bottomBorder={bottomBorder}
      />
      <div />
    </HoverBox>
  );
};

const TwoImages = ({ urls }: { urls: string[] }) => {
  return (
    <FlexWrap>
      <ActiveImageBox src={urls[0]} width={340} height={340} rightBorder />
      <ActiveImageBox src={urls[1]} width={340} height={340} leftBorder />
    </FlexWrap>
  );
};

const ThreeImagesHorizontal = ({ urls }: { urls: string[] }) => {
  return (
    <div>
      <ActiveImageBox src={urls[0]} width={680} height={340} bottomBorder />
      <FlexWrap>
        <ActiveImageBox
          src={urls[1]}
          width={340}
          height={340}
          topBorder
          rightBorder
        />
        <ActiveImageBox
          src={urls[2]}
          width={340}
          height={340}
          topBorder
          leftBorder
        />
      </FlexWrap>
    </div>
  );
};

const ThreeImagesVertical = ({ urls }: { urls: string[] }) => {
  return (
    <FlexWrap>
      <ActiveImageBox src={urls[0]} width={340} height={680} rightBorder />
      <div>
        <ActiveImageBox
          src={urls[1]}
          width={340}
          height={340}
          leftBorder
          bottomBorder
        />
        <ActiveImageBox
          src={urls[2]}
          width={340}
          height={340}
          leftBorder
          topBorder
        />
      </div>
    </FlexWrap>
  );
};

const PostImageBox = ({ imageCount, images }: PostImageBoxProps) => {
  const isLoading = useCallback(() => {
    return imageCount >= 1 && images === null;
  }, [imageCount, images]);

  if (isLoading()) {
    return <SkeletonBox />;
  }

  const postImages = images as PostImageInfo[];
  const { url, originalWidth, originalHeight } = postImages[0];
  const { url: url2 } = imageCount >= 2 ? postImages[1] : { url: errorImage };
  const { url: url3 } = imageCount >= 3 ? postImages[2] : { url: errorImage };

  const [width, height] = imageUtil.getImageFitSize(
    680,
    originalWidth,
    originalHeight
  );

  return imageCount === 1 ? (
    <ActiveImageBox src={url} width={width} height={height} />
  ) : imageCount === 2 ? (
    <TwoImages urls={[url, url2]} />
  ) : imageCount === 3 && originalWidth >= originalHeight ? (
    <ThreeImagesHorizontal urls={[url, url2, url3]} />
  ) : imageCount === 3 && originalWidth < originalHeight ? (
    <ThreeImagesVertical urls={[url, url2, url3]} />
  ) : (
    <div></div>
  );
};

export default PostImageBox;
