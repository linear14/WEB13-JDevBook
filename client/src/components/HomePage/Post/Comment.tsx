import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import { ProfilePhoto } from 'components/common';
import palette from 'theme/palette';

const Animation = keyframes`
  0% { opacity: 0; filter: blur(10px); }
  100% { opacity: 1; filter: blur(0px); }
`;

const CommentsWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  animation-name: ${Animation};
  animation-duration: 0.5s;
`;

const ClickableProfileImage = styled(ProfilePhoto)``;

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
            <CommentTitle>CommentWriter</CommentTitle> {/* 댓글 작성자 */}
            <CommentText>
              asdasdaskjdnanskjdnkjasndkjsandjkasndkjasndkjskjd
            </CommentText>{' '}
            {/* 댓글 내용 */}
          </CommentContent>
        </CommentBox>
      </CommentsWrap>
    </>
  );
};

export default Comment;
