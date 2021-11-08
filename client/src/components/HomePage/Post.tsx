import { ProfilePhoto } from 'components';
import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as IconPublic } from 'images/icon-public.svg';
import likeBadge from 'images/icon-like-badge.svg';
import { ReactComponent as LikeIcon } from 'images/icon-like.svg';
import { ReactComponent as CommentIcon } from 'images/icon-comment.svg';

const PostContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin: 100px auto;

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

const Header = () => {
  return (
    <HeaderContainer>
      <ClickableProfileImage size={'40px'} />
      <HeaderContent>
        <p>대학내일</p>
        <div>
          <p>November 5 at 11:23 PM</p>
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
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  margin-top: 8px;
`;

const Body = () => {
  return (
    <BodyContainer>
      <p>
        쫄깃달달🤎떡츄러스 빼빼로🤎레시피 벌써 빼빼로데이..아니
        가래떡데이라구요...! 가래떡츄러스에 초코범벅 벌써 맛있따;;;; @@올해는
        이걸루 해주기로 해(●'◡'●)ㅎㅎ
      </p>
      <ImagesWrap />
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

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <img src={likeBadge} />
        <p>770</p>
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
  margin: 4px 12px;
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  flex: 1;
  margin: 0px 2px;
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
const Post = () => {
  return (
    <PostContainer>
      <Header />
      <Body />
      <Footer />
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
