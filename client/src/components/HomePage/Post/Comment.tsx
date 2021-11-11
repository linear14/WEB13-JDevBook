import React from 'react';
import styled, { css } from 'styled-components';

import { ProfilePhoto } from 'components/common';
import palette from 'theme/palette';

const ClickableProfileImage = styled(ProfilePhoto)`
  margin-left: 20px;
`;

const CommentsWrap = styled.div`
  display: flex;
  align-items: center;
  padding:10px;
`;

const CommentBox = styled.div`
  margin-left: 10px;
  display: inline-block;
  background-color: ${palette.lightgray};
  border-radius: 15px;
`;

const CommentContent = styled.div`
    margin: 5px;
    word-break: break-word;
`;

const CommentTitle = styled.div``;
const CommentText = styled.div`
    font-weight: normal;
`;

const Comment = () => {
  return (
    <>
      <CommentsWrap>
        <ClickableProfileImage size={'30px'} />
        <CommentBox>
          <CommentContent>
            <CommentTitle>CommentWriter</CommentTitle>
            <CommentText>asdasdaskjdnanskjdnkjasndkjsandjkasndkjasndkjskjd</CommentText>
          </CommentContent>
        </CommentBox>
      </CommentsWrap>
    </>
  );
};

export default Comment;
