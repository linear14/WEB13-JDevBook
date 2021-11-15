import { PostImageInfo } from 'types/post';
import imageUtil from 'utils/imageUtil';
import ActiveImageBox from './ActiveImageBox';
import { CropCenter, FlexWrap } from './styles';

const ThreeImagesHorizontal = ({
  postImages
}: {
  postImages: PostImageInfo[];
}) => {
  if (postImages.length !== 3) return <div></div>;

  const { url: url1, originalWidth: ow1, originalHeight: oh1 } = postImages[0];
  const { url: url2, originalWidth: ow2, originalHeight: oh2 } = postImages[1];
  const { url: url3, originalWidth: ow3, originalHeight: oh3 } = postImages[2];

  const [w1, h1] = imageUtil.getImageFitSizeForCrop(680, 340, ow1, oh1);
  const [w2, h2] = imageUtil.getImageFitSizeForCrop(340, 340, ow2, oh2);
  const [w3, h3] = imageUtil.getImageFitSizeForCrop(340, 340, ow3, oh3);

  const urls = [url1, url2, url3];

  return (
    <div>
      <CropCenter width={680} height={340}>
        <ActiveImageBox
          index={0}
          width={w1}
          height={h1}
          urls={urls}
          bottomBorder
        />
      </CropCenter>
      <FlexWrap>
        <CropCenter width={340} height={340}>
          <ActiveImageBox
            index={1}
            width={w2}
            height={h2}
            urls={urls}
            topBorder
            rightBorder
          />
        </CropCenter>
        <CropCenter width={340} height={340}>
          <ActiveImageBox
            index={2}
            width={w3}
            height={h3}
            urls={urls}
            topBorder
            leftBorder
          />
        </CropCenter>
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

  const [w1, h1] = imageUtil.getImageFitSizeForCrop(340, 680, ow1, oh1);
  const [w2, h2] = imageUtil.getImageFitSizeForCrop(340, 340, ow2, oh2);
  const [w3, h3] = imageUtil.getImageFitSizeForCrop(340, 340, ow3, oh3);

  const urls = [url1, url2, url3];

  return (
    <FlexWrap>
      <CropCenter width={340} height={680}>
        <ActiveImageBox
          index={0}
          width={w1}
          height={h1}
          urls={urls}
          rightBorder
        />
      </CropCenter>
      <div>
        <CropCenter width={340} height={340}>
          <ActiveImageBox
            index={1}
            width={w2}
            height={h2}
            urls={urls}
            leftBorder
            bottomBorder
          />
        </CropCenter>
        <CropCenter width={340} height={340}>
          <ActiveImageBox
            index={2}
            width={w3}
            height={h3}
            urls={urls}
            leftBorder
            topBorder
          />
        </CropCenter>
      </div>
    </FlexWrap>
  );
};

export { ThreeImagesHorizontal, ThreeImagesVertical };
