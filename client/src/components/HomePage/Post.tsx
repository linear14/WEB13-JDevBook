import { ProfilePhoto } from 'components/common';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdMoreHoriz } from 'react-icons/md';

import {
  LikeIcon,
  CommentIcon,
  IconPublic,
  IconPrivate,
  likeBadge
} from 'images/icons';
import {
  PostProps,
  PostHeaderProps,
  PostBodyProps,
  PostFooterProps,
  PostImageBoxProps,
  PostImageInfo
} from 'utils/types';
import textUtil from 'utils/textUtil';
import palette from 'theme/palette';

import PostImageBox from 'components/HomePage/PostImageBox';
import imageUtil from 'utils/imageUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalVisibleStates, userData } from 'recoil/store';

const PostContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  margin-top: 24px;
  background-color: ${palette.white};

  p {
    margin: 0;
  }
`;

// Header Start
const HeaderContainer = styled.div`
  width: 100%;
  box-sizing: inherit;
  padding: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
`;

const ClickableProfileImage = styled(ProfilePhoto)``;
const HeaderContent = styled.div`
  flex: 1;
  margin-left: 12px;

  & > div {
    display: flex;
    align-items: center;
    margin-top: 2px;
    font-size: 0.8rem;
    color: #888888;

    path {
      fill: #555555;
    }

    p {
      margin-right: 2px;
    }
  }
`;

const Header = ({ nickname, profile, createdAt, secret }: PostHeaderProps) => {
  return (
    <HeaderContainer>
      <ClickableProfileImage size={'40px'} />
      <HeaderContent>
        <p>{nickname}</p>
        <div>
          <p>{textUtil.timeToString(createdAt)}</p>
          <p>·</p>
          {secret ? <IconPrivate /> : <IconPublic />}
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
};

// Header End

// Body Start
const BodyContainer = styled.div`
  width: 100%;
  box-sizing: inherit;

  p {
    padding-left: 16px;
    padding-right: 16px;
    color: #050505;
  }
`;

const ImagesWrap = styled.div`
  width: 680px;
  background: ${palette.white};
  position: relative;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 여기서 이미지 정보들을 전부 가공해서 주자 (url, 원본 width, 원본 height)
const Body = ({ contents, picture1, picture2, picture3 }: PostBodyProps) => {
  const initMeta = {
    imageCount: [picture1, picture2, picture3].filter((item) => item !== null)
      .length,
    images: null
  };
  const [imagesMeta, setImagesMeta] = useState<PostImageBoxProps>(initMeta);

  useEffect(() => {
    async function makeImageInfoObject() {
      if (imagesMeta.imageCount !== 0) {
        const images = await Promise.all(
          [picture1, picture2, picture3]
            .filter((item) => item !== null)
            .map(async (item) => {
              if (item) {
                const [url, originalWidth, originalHeight] =
                  await imageUtil.getImageSize(item);
                return { url, originalWidth, originalHeight };
              }
            })
        );
        setImagesMeta({
          ...imagesMeta,
          images: images.filter(
            (image) => image !== undefined
          ) as PostImageInfo[]
        });
      }
    }

    makeImageInfoObject();
  }, []);

  return (
    <BodyContainer>
      <p>{contents}</p>
      {picture1 && (
        <ImagesWrap>
          <PostImageBox
            imageCount={imagesMeta.imageCount}
            images={imagesMeta.images}
          />
        </ImagesWrap>
      )}
    </BodyContainer>
  );
};

// Body End

// Footer Start
const FooterContainer = styled.div`
  width: 100%;
  box-sizing: inherit;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    img {
      width: 18px;
      height: 18px;
      margin-right: 4px;
    }
  }

  p {
    font-size: 0.95rem;
    color: #999999;
  }
`;

const Footer = ({ likenum }: PostFooterProps) => {
  return (
    <FooterContainer>
      <div>
        <img src={likeBadge} alt="likeBadge" />
        <p>{likenum.toString()}</p>
      </div>
      <p>777 Comments</p>
    </FooterContainer>
  );
};

// Footer End

// Etc
const ButtonsWrap = styled.div`
  width: calc(100% - 24px);
  box-sizing: inherit;
  margin: 4px 12px 0px;
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  flex: 1;
  margin: 0px 2px 4px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s ease-in-out;

  p {
    margin-left: 4px;
    color: #666666;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  path {
    fill: #666666;
  }

  &:hover {
    background: #f2f2f2;
    border-radius: 4px;
  }
`;

const IconHover = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${palette.lightgray};
  }

  svg {
    font-size: 24px;
  }
`;

const Divider = styled.div`
  width: calc(100% - 32px);
  height: 1px;
  background: #dddddd;
  margin-left: 16px;
  margin-right: 16px;
`;

// OptionModal Start
const OptionModalContainer = styled.div`
  width: 240px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background: ${palette.white};
  border-radius: 8px;
  position: absolute;
  top: 48px;
  right: 16px;
  box-sizing: border-box;
  padding: 8px;

  div {
    padding: 12px;
    transition: 0.2s ease-in;

    &:hover {
      background: ${palette.gray};
      border-radius: 8px;
    }
  }
`;

const OptionModal = () => {
  const [modalState, setModalState] = useRecoilState(modalVisibleStates);

  const modal = React.useRef<HTMLDivElement>(null);
  const closeModal = (e: any, force?: boolean) => {
    if (!force && modal.current?.contains(e.target)) {
      return;
    }
    setModalState({ ...modalState, postOption: -1 });
  };

  useEffect(() => {
    document.addEventListener('click', closeModal);

    return () => {
      document.removeEventListener('click', closeModal);
    };
  }, []);

  return (
    <OptionModalContainer ref={modal}>
      <div>게시글 수정</div>
      <div style={{ color: palette.alert }}>게시글 삭제</div>
    </OptionModalContainer>
  );
};

// OptionModal End

// Export Default
const Post = ({ post }: PostProps) => {
  const [modalState, setModalState] = useRecoilState(modalVisibleStates);
  const {
    idx: postIdx,
    secret,
    createdAt,
    contents,
    picture1,
    picture2,
    picture3,
    likenum,
    BTUseruseridx
  } = post;
  const { idx: postUserIdx, nickname, profile } = BTUseruseridx;
  const { idx: myIdx } = useRecoilValue(userData);
  return (
    <PostContainer>
      {postUserIdx === myIdx && (
        <IconHover
          onClick={() => setModalState({ ...modalState, postOption: postIdx })}
        >
          <MdMoreHoriz />
        </IconHover>
      )}
      {modalState.postOption === postIdx && <OptionModal />}
      <Header
        nickname={nickname}
        profile={profile}
        createdAt={createdAt}
        secret={secret}
      />
      <Body
        contents={contents}
        picture1={picture1}
        picture2={picture2}
        picture3={picture3}
      />
      <Footer likenum={likenum} />
      <Divider />
      <ButtonsWrap>
        <Button>
          <LikeIcon />
          <p>Like</p>
        </Button>
        <Button>
          <CommentIcon />
          <p>Comment</p>
        </Button>
      </ButtonsWrap>
    </PostContainer>
  );
};

export default Post;
