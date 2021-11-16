import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { FiUpload } from 'react-icons/fi';
import { useRecoilState, useResetRecoilState } from 'recoil';

import {
  isImgMaxState,
  isImgUploadingState,
  modalStateStore,
  postModalDataStates
} from 'recoil/store';
import palette from 'theme/palette';
import fetchApi from 'api/fetch';

const ModalAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ImgUploadContainer = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 360px;
  width: 532px;
  height: 200px;
  box-sizing: border-box;
  padding: 8px;

  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${palette.darkgray};
  animation: ${ModalAnimation} 0.2s 1;

  display: ${(props) => (props.modalState ? 'block' : 'none')};
`;

const ImgUploadWrap = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 8px;
  background-color: ${palette.lightgray};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: auto;
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

  &:active {
    width: 35px;
    height: 35px;
    background-color: ${palette.gray};
  }
`;

const WhatWorkModal = styled.div`
  width: 150px;
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

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

const ImgPreview = styled.div`
  width: 150px;
  height: 100px;

  display: none;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */

  img {
    width: 100%;
    height: 100%;
  }

  img[src=''] {
    display: none;
  }
`;

const ImgUploadModal = () => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  const [postData, setPostData] = useRecoilState(postModalDataStates);
  const [isImgUploading, setIsImgUploading] =
    useRecoilState(isImgUploadingState);
  const [isImgMax, setIsImgMax] = useRecoilState(isImgMaxState);
  const inputfile = useRef() as React.MutableRefObject<HTMLInputElement>;
  const imgUploadModal = useRef() as React.MutableRefObject<HTMLInputElement>;
  const imgPreviewModal = useRef() as React.MutableRefObject<HTMLInputElement>;

  const imgUploadModalOff = (e: React.MouseEvent<HTMLDivElement>) => {
    setModalState({
      ...modalState,
      post: { ...modalState.post, inPhoto: false }
    });
    setPostData({
      ...postData,
      picture1: null,
      picture2: null,
      picture3: null
    });
    setIsImgUploading(false);
    setIsImgMax(false);
  };

  const imgUpload = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isImgMax) {
      alert('첨부 사진은 3장까지 가능합니다.');
    } else if (!isImgUploading) {
      inputfile.current.click();
    } else {
      alert('이미지 업로드 중입니다.');
    }
  };
  const getFile = async () => {
    if (!inputfile.current.files) return setIsImgUploading(false);
    // 업로드 직후 다시 클릭하고 취소하면 getFile 실행되는데 파일은 없음
    if (inputfile.current.files.length === 0) return setIsImgUploading(false);

    const imglist: FileList = inputfile.current.files;
    const s3fileRes = await fetchApi.uploadImg(imglist);

    if (!s3fileRes.save) {
      alert('이미지 업로드 실패');
      return setIsImgUploading(false);
    }

    // 첨부하면 아직 취소 불가, 드래그X, 미리보기X
    if (postData.picture1 === null)
      setPostData({ ...postData, picture1: s3fileRes.file.location });
    else if (postData.picture2 === null)
      setPostData({ ...postData, picture2: s3fileRes.file.location });
    else if (postData.picture3 === null) {
      setPostData({ ...postData, picture3: s3fileRes.file.location });
      // setIsImgMax(true); // 이거 비동기인가여?
    }
    // setIsImgUploading(false);  // 이거 비동기인가여?
  };

  useEffect(() => {
    if (isImgUploading === true) getFile();
  }, [isImgUploading]);

  useEffect(() => {
    if (postData.picture1 === null) {
      imgPreviewModal.current.style.display = 'none';
    } else {
      imgPreviewModal.current.style.display = 'flex';
    }
  }, [postData.picture1]);

  useEffect(() => {
    if (postData.picture3 !== null) setIsImgMax(true);
  }, [postData.picture3]);

  useEffect(() => {
    if (isImgUploading === true) {
      setIsImgUploading(false);
    }
  }, [postData.picture1, postData.picture2, postData.picture3]);

  return (
    <ImgUploadContainer modalState={modalState.post.inPhoto}>
      <ImgUploadWrap>
        <CloseBtn onClick={imgUploadModalOff}>
          <IoClose size="28px" />
        </CloseBtn>
        <WhatWorkModal ref={imgUploadModal} onClick={imgUpload}>
          <div className="icon">
            <FiUpload size="20px" />
          </div>
          <div className="title">사진 추가</div>
          <div className="subtitle">또는 끌어서 놓습니다</div>
        </WhatWorkModal>
        <ImgPreview ref={imgPreviewModal}>
          <img src={postData.picture1 ?? ''} />
          <img src={postData.picture2 ?? ''} />
          <img src={postData.picture3 ?? ''} />
        </ImgPreview>
      </ImgUploadWrap>
      <input
        type="file"
        accept="image/*"
        ref={inputfile}
        onChange={() => setIsImgUploading(true)}
        style={{ display: 'none' }}
      />
    </ImgUploadContainer>
  );
};

export default ImgUploadModal;
