import React from 'react';
import { PostImageInfo } from 'types/post';
import ActiveImageBox from './ActiveImageBox';
import { FlexWrap } from './styles';

const TwoImages = ({ postImages }: { postImages: PostImageInfo[] }) => {
  if (postImages.length !== 2) return <div></div>;

  const { url: url1, originalWidth: ow1, originalHeight: oh1 } = postImages[0];
  const { url: url2, originalWidth: ow2, originalHeight: oh2 } = postImages[1];

  const urls = [url1, url2];

  return (
    <FlexWrap>
      <ActiveImageBox
        index={0}
        width={340}
        height={340}
        urls={urls}
        rightBorder
      />
      <ActiveImageBox
        index={1}
        width={340}
        height={340}
        urls={urls}
        leftBorder
      />
    </FlexWrap>
  );
};

export default TwoImages;
