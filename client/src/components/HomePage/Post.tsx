import { ProfilePhoto } from 'components';
import React from 'react';
import styled, { css } from 'styled-components';
import {
  LikeIcon,
  CommentIcon,
  IconPublic,
  IconPrivate,
  likeBadge
} from 'images';
import {
  PostProps,
  PostHeaderProps,
  PostBodyProps,
  PostFooterProps
} from 'utils/types';
import textUtil from 'utils/textUtil';
import PostImageBox from './PostImageBox';

const PostContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin-top: 24px;

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

const Header: React.FC<PostHeaderProps> = ({
  nickname,
  profile,
  createdAt
}) => {
  return (
    <HeaderContainer>
      <ClickableProfileImage size={'40px'} />
      <HeaderContent>
        <p>{nickname}</p>
        <div>
          <p>{textUtil.timeToString(createdAt)}</p>
          <p>·</p>
          <IconPublic />
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
  height: 680px;
  background: #eeeeee;
  position: relative;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  margin-top: 8px;
`;

const Body: React.FC<PostBodyProps> = ({
  contents,
  picture1,
  picture2,
  picture3
}) => {
  return (
    <BodyContainer>
      <p>{contents}</p>
      {picture1 && (
        <ImagesWrap>
          <PostImageBox
            images={
              [picture1, picture2, picture3].filter(
                (picture) => picture !== null
              ) as string[]
            }
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

const Footer: React.FC<PostFooterProps> = ({ likenum }) => {
  return (
    <FooterContainer>
      <div>
        <img src={likeBadge} />
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

const Divider = styled.div`
  width: calc(100% - 32px);
  height: 1px;
  background: #dddddd;
  margin-left: 16px;
  margin-right: 16px;
`;

// Export Default
const Post: React.FC<PostProps> = ({ post }) => {
  const {
    createdAt,
    contents,
    picture1,
    picture2,
    picture3,
    likenum,
    BTUseruseridx
  } = post;
  const { nickname, profile } = BTUseruseridx;
  return (
    <PostContainer>
      <Header nickname={nickname} profile={profile} createdAt={createdAt} />
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
