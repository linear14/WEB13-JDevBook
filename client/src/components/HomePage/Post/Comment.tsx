import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled, { keyframes } from 'styled-components';

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

const CommentInputWrap = styled.div`
  animation-name: ${Animation};
  animation-duration: 0.5s;
  padding: 10px;
`;
const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const CommentInput = styled.input`
  margin-left: 10px;
  border: none;
  border-radius: 15px;
  background-color: ${palette.lightgray};
  height: 35px;
  width: 600px;
  padding-left: 10px;
`;

const Comment = () => {
  const [value, setValue] = useState<string>('');
  const [commentList, setCommentList] = useState<string[]>([]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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

      <CommentInputWrap>
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            if (value) {
              submit(e);
              setValue('');
            } else {
              e.preventDefault();
            }
          }}
        >
          <CommentInputWrapper>
            <ClickableProfileImage size={'30px'} />
            <CommentInput
              type="text"
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              value={value}
              placeholder="댓글을 입력하세요..."
            />
          </CommentInputWrapper>
        </form>
      </CommentInputWrap>
    </>
  );
};

export default Comment;
