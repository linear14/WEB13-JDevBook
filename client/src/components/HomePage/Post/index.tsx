import React from 'react';
import styled, { css } from 'styled-components';
import { MdMoreHoriz } from 'react-icons/md';

import { LikeIcon, CommentIcon } from 'images/icons';
import { PostProps } from 'utils/types';

import palette from 'theme/palette';

import { useRecoilState, useRecoilValue } from 'recoil';
import { modalVisibleStates, userData, CommentState } from 'recoil/store';
import Header from './Header';
import OptionModal from './OptionModal';
import Body from './Body';
import Footer from './Footer';
import Comment from './Comment';

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
  cursor: pointer;

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

const CommentsWrap = styled.div`

`;

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

  const commentFlag = useRecoilValue(CommentState);

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
      <Divider />
      <Comment />
    </PostContainer>
  );
};

export default Post;
