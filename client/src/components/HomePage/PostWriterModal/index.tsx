import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';

import palette from 'theme/palette';
import { modalVisibleStates } from 'recoil/store';

import ModalTitle from 'components/HomePage/PostWriterModal/ModalTitle';
import PostInfo from 'components/HomePage/PostWriterModal/PostInfo';
import ModalContents from 'components/HomePage/PostWriterModal/ModalContents';
import AddContentsBar from 'components/HomePage/PostWriterModal/AddContentsBar';
import ImgUploadModal from './ImgUploadModal';

const PostWriterModalOverlay = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.2);

  display: ${(props) => (props.modalState ? 'flex' : 'none')};
`;

const ModalAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const PostWriterModalInner = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 160px;
  width: 600px;
  box-sizing: border-box;
  padding: 20px;
  z-index: 6;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 8px;
  background-color: ${palette.white};
  animation: ${ModalAnimation} 0.5s 1;

  display: ${(props) => (props.modalState ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  border-color: ${palette.gray};
  border-width: 1px;
  border-style: solid;
  margin: 12px 0;
`;

const PostBtn = styled.div`
  width: 95%;
  height: 40px;
  margin-top: 16px;

  border-radius: 8px;
  background-color: ${palette.green};
  color: ${palette.white};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${palette.darkgreen};
    transition: all 0.1s;
  }
`;

const PostWriterModal = () => {
  const modalState = useRecoilValue(modalVisibleStates);

  return (
    <>
      <PostWriterModalOverlay modalState={modalState.postWriter} />
      <PostWriterModalInner modalState={modalState.postWriter}>
        <ModalTitle />
        <Line />
        <PostInfo />
        <ModalContents />
        <AddContentsBar />
        <PostBtn>
          <div>게시</div>
        </PostBtn>
        <ImgUploadModal />
      </PostWriterModalInner>
    </>
  );
};

export default PostWriterModal;
