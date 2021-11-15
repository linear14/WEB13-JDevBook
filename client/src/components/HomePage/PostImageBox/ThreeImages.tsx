import { PostImageInfo } from 'types/post';
import ActiveImageBox from './ActiveImageBox';
import { FlexWrap } from './styles';

const ThreeImagesHorizontal = ({
  postImages
}: {
  postImages: PostImageInfo[];
}) => {
  if (postImages.length !== 3) return <div></div>;

  const { url: url1, originalWidth: ow1, originalHeight: oh1 } = postImages[0];
  const { url: url2, originalWidth: ow2, originalHeight: oh2 } = postImages[1];
  const { url: url3, originalWidth: ow3, originalHeight: oh3 } = postImages[2];

  const urls = [url1, url2, url3];

  return (
    <div>
      <ActiveImageBox
        index={0}
        width={680}
        height={340}
        urls={urls}
        bottomBorder
      />
      <FlexWrap>
        <ActiveImageBox
          index={1}
          width={340}
          height={340}
          urls={urls}
          topBorder
          rightBorder
        />
        <ActiveImageBox
          index={2}
          width={340}
          height={340}
          urls={urls}
          topBorder
          leftBorder
        />
      </FlexWrap>
    </div>
  );
};

const ThreeImagesVertical = ({
  postImages
}: {
  postImages: PostImageInfo[];
}) => {
  if (postImages.length !== 3) return <div></div>;

  const { url: url1, originalWidth: ow1, originalHeight: oh1 } = postImages[0];
  const { url: url2, originalWidth: ow2, originalHeight: oh2 } = postImages[1];
  const { url: url3, originalWidth: ow3, originalHeight: oh3 } = postImages[2];

  const urls = [url1, url2, url3];

  return (
    <FlexWrap>
      <ActiveImageBox
        index={0}
        width={340}
        height={680}
        urls={urls}
        rightBorder
      />
      <div>
        <ActiveImageBox
          index={1}
          width={340}
          height={340}
          urls={urls}
          leftBorder
          bottomBorder
        />
        <ActiveImageBox
          index={2}
          width={340}
          height={340}
          urls={urls}
          leftBorder
          topBorder
        />
      </div>
    </FlexWrap>
  );
};

export { ThreeImagesHorizontal, ThreeImagesVertical };
