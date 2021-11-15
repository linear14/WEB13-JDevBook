import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { FiUpload } from 'react-icons/fi';
import { useRecoilState } from 'recoil';

import { modalStateStore, postModalDataStates } from 'recoil/store';
import palette from 'theme/palette';
import { ImgUploadModalProps } from 'types/post';
import fetchApi from 'api/fetch';
// import objectStorage from 'api/objectStorage';

const ModalAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ImgUploadContainer = styled.div<ImgUploadModalProps>`
  position: fixed;
  top: 408px;
  width: 532px;
  height: 200px;
  box-sizing: border-box;
  padding: 8px;

  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${palette.darkgray};
  animation: ${ModalAnimation} 0.5s 1;

  display: ${(props) => (props.modalState ? 'block' : 'none')};
`;

const ImgUploadWrap = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 8px;
  background-color: ${palette.lightgray};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 36px;
  height: 36px;
  box-sizing: border-box;
  margin: 16px;

  border-radius: 50%;
  border-style: solid;
  border-width: 1px;
  border-color: ${palette.darkgray};
  background-color: ${palette.white};
  color: ${palette.darkgray};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const WhatWorkModal = styled.div`
  width: 150px;
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div.icon {
    width: 40px;
    height: 40px;
    margin-bottom: 5px;

    border-radius: 50%;
    background-color: ${palette.gray};

    display: flex;
    justify-content: center;
    align-items: center;
  }
  div.title {
    font-size: 28px;
    font-weight: bold;
  }
  div.subtitle {
    font-size: 12px;
    font-weight: bold;
  }
`;

const ImgUploadModal = () => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  const [postData, setPostData] = useRecoilState(postModalDataStates);

  const imgUploadModalOff = (e: React.MouseEvent<HTMLDivElement>) => {
    setModalState({
      ...modalState,
      post: { ...modalState.post, inPhoto: false }
    });
  };
  const inputfile = useRef() as React.MutableRefObject<HTMLInputElement>;
  const imgUpload = (e: React.MouseEvent<HTMLDivElement>) => {
    // 2장 올린후 바로 클릭하면 postData 반영이 느려서 click 될 때가 있다.
    if (postData.picture3 !== null) alert('첨부 사진은 3장까지 가능합니다.');
    else inputfile.current.click();
  };
  const getFilename = async () => {
    if (inputfile.current.files) {
      const imglist: FileList = inputfile.current.files;
      const s3fileRes = await fetchApi.uploadImg(imglist);
      if (s3fileRes.save) {
        // 게시 버튼 이벤트 하는 곳과 엑스 눌러서 취소하는 곳을 모르겠다...
        // 첨부하면 아직 취소 불가, 드래그X, 미리보기X
        if (postData.picture1 === null)
          setPostData({ ...postData, picture1: s3fileRes.file.location });
        else if (postData.picture2 === null)
          setPostData({ ...postData, picture2: s3fileRes.file.location });
        else if (postData.picture3 === null)
          setPostData({ ...postData, picture3: s3fileRes.file.location });
      }
    }
  };

  return (
    <ImgUploadContainer
      modalState={modalState.post.inPhoto}
      writerModalState={modalState.post.writer}
    >
      <ImgUploadWrap>
        <CloseBtn onClick={imgUploadModalOff}>
          <IoClose size="28px" />
        </CloseBtn>
        <WhatWorkModal onClick={imgUpload}>
          <div className="icon">
            <FiUpload size="20px" />
          </div>
          <div className="title">사진 추가</div>
          <div className="subtitle">또는 끌어서 놓습니다</div>
        </WhatWorkModal>
      </ImgUploadWrap>
      <input
        type="file"
        accept="image/*"
        ref={inputfile}
        onChange={getFilename}
        style={{ display: 'none' }}
      />
    </ImgUploadContainer>
  );
};

export default ImgUploadModal;
