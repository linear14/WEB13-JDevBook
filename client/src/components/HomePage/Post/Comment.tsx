import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { userDataStates, usersocketStates } from 'recoil/store';
import { ProfilePhoto } from 'components/common';
import palette from 'theme/palette';

const Animation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
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
  display: inline-block;
  border-radius: 15px;
  background-color: ${palette.lightgray};
  margin-left: 10px;
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
  width: 600px;
  height: 35px;
  border: none;
  border-radius: 15px;

  background-color: ${palette.lightgray};
  margin-left: 10px;
  padding-left: 10px;
`;

interface IComment {
  writer: string;
  text: string;
}

const Comment = ({ postIdx }: { postIdx: number }) => {
  const [value, setValue] = useState<string>('');
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const socket = useRecoilValue(usersocketStates);
  const userdata = useRecoilValue(userDataStates);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket !== null) {
      socket.emit('add comment', {
        sender: userdata.name,
        postidx: postIdx,
        comments: value
      });
    }
  };

  useEffect(() => {
    setCommentList([]);
    if (socket !== null) {
      socket.emit('send comments initial', {
        postidx: postIdx
      });

      socket.on('get previous comments', (comment: IComment[]) => {
        setCommentList((commentList: IComment[]) =>
          commentList.concat(comment)
        );
        socket.off('get previous comments');
      });
    }
  }, [postIdx, socket]);

  useEffect(() => {
    if (socket !== null) {
      socket.off('receive comment');
      socket.on(
        'receive comment',
        (data: { sender: string; postidx: number; comments: string }) => {
          const { sender, postidx, comments } = data;
          setCommentList((commentList: IComment[]) =>
            commentList.concat({ writer: sender, text: comments })
          );
        }
      );
    }
  }, [commentList, socket]);

  const comments = commentList.map((comment: IComment, idx: number) => (
    <CommentsWrap key={idx}>
      <ClickableProfileImage size={'30px'} />
      <CommentBox>
        <CommentContent>
          <CommentTitle>{comment.writer}</CommentTitle>
          <CommentText>{comment.text}</CommentText>
        </CommentContent>
      </CommentBox>
    </CommentsWrap>
  ));

  return (
    <>
      {comments}
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
              onFocus={(e: any) => {
                setCommentList((commentList: IComment[]) =>
                  commentList.concat()
                );
              }}
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
