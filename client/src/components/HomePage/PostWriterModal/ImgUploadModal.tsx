import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { FiUpload } from 'react-icons/fi';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { imageViewerState as ivState, uploadImgList } from 'recoil/store';

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
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${palette.gray};
  }
`;

const CloseBtn = styled.div<{ right: number }>`
  position: absolute;
  top: 0;
  right: ${({ right }) => `${right}px`};
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
    filter: brightness(95%);
    transition: all 0.1s;
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

  &:hover {
    cursor: pointer;
    filter: brightness(95%);
    transition: all 0.1s;
  }

  &:active {
    filter: brightness(90%);
  }

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
  /* width: 300px;
  height: 200px; */

  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  div.imgset {
    display: flex;
    flex-direction: row;
    /* justify-content: center;
    align-items: center; */
  }

  img {
    width: 120px;
    height: 100%;
    border: 10px solid ${palette.lightgray};

    &:hover {
      cursor: pointer;
    }
    &:active {
      cursor: pointer;
    }
  }

  img[src=''] {
    display: none;
  }
`;

const CloseOneImg = styled.div<{ imgsrc: string | undefined }>`
  display: ${({ imgsrc }) => (imgsrc ? 'flex' : 'none')};
  position: relative;
  top: 10px;
  left: 10px;

  &:hover {
    cursor: pointer;
    color: red;
  }
  &:active {
    cursor: pointer;
    transform-origin: 10px 10px;
    transform: scale(1.2);
    transition: transform 0.1s;
  }
`;

const ImgUploadModal = () => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  const [postData, setPostData] = useRecoilState(postModalDataStates);
  const [isImgUploading, setIsImgUploading] =
    useRecoilState(isImgUploadingState);
  const [isImgMax, setIsImgMax] = useRecoilState(isImgMaxState);
  const [imageViewerState, setImageViewerState] = useRecoilState(ivState);
  const [imgList, setImgList] = useRecoilState(uploadImgList);

  const inputfile = useRef() as React.MutableRefObject<HTMLInputElement>;
  const imgUploadWrapRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const imgPreviewModal = useRef() as React.MutableRefObject<HTMLInputElement>;
  const uploadButtonRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const workModalRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const imgUploadModalOff = (e: React.MouseEvent<HTMLDivElement>) => {
    // setModalState({
    //   ...modalState,
    //   post: { ...modalState.post, inPhoto: false }
    // });
    setImgList([] as string[]);
    setIsImgUploading(0);
    setIsImgMax(false);
  };

  const imgUpload = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isImgMax) {
      alert('첨부 사진은 3장까지 가능합니다.');
      // } else if (isImgUploading) {
      //   alert('이미지 업로드 중입니다.');
    } else {
      inputfile.current.click();
    }
  };

  const getFile = async () => {
    if (!inputfile.current.files) return setIsImgUploading(isImgUploading - 1);
    // 업로드 직후 다시 클릭하고 취소하면 getFile 실행되는데 파일은 없음
    if (inputfile.current.files.length === 0)
      return setIsImgUploading(isImgUploading - 1);
    if (inputfile.current.files[0].type.match(/image\/*/) === null) {
      alert('이미지가 아닙니다.');
      return setIsImgUploading(isImgUploading - 1);
    }

    const imglist: FileList = inputfile.current.files;
    const s3fileRes = await fetchApi.uploadImg(imglist);

    if (!s3fileRes.save) {
      alert('이미지 업로드 실패');
      return setIsImgUploading(isImgUploading - 1);
    }

    setImgList([...imgList, s3fileRes.file.location]);
  };

  const imgPreviewBigger = (e: BaseSyntheticEvent) => {
    // 연속되게는 안함
    setImageViewerState({
      ...imageViewerState,
      imageCount: 1,
      currentIdx: 0,
      images: [e.target.src ?? ''],
      isOpen: true
    });
  };

  const deleteOneImg = (idx: number) => {
    const tmp = imgList.map((v) => v);
    tmp.splice(idx, 1);
    setImgList(tmp);
  };

  const imgsetRendering = (): JSX.Element[] => {
    return [0, 1, 2].map((v) => (
      <div className="imgset">
        <CloseOneImg imgsrc={imgList[v]} onClick={deleteOneImg.bind(null, v)}>
          <IoClose size="20px" />
        </CloseOneImg>
        <img src={imgList[v] ?? ''} onClick={imgPreviewBigger} />
      </div>
    ));
  };

  useEffect(() => {
    if (isImgUploading > 0) getFile();
  }, [isImgUploading]);

  useEffect(() => {
    if (isImgUploading > 0) {
      setIsImgUploading(isImgUploading - 1);
    }
    if (imgList.length === 3) {
      setIsImgMax(true);
    }
    if (imgList.length > 0) {
      imgPreviewModal.current.style.display = 'flex';
      uploadButtonRef.current.style.display = 'flex';
      workModalRef.current.style.display = 'none';
    } else {
      imgPreviewModal.current.style.display = 'none';
      uploadButtonRef.current.style.display = 'none';
      workModalRef.current.style.display = 'flex';
    }
  }, [imgList]);

  useEffect(() => {
    // 게시글 수정 시에 필요
    // 1,2,3 순서대로 채워지지만 코드가 그걸 알리가 없지...
    if (postData.picture3 !== null) {
      setImgList([
        postData.picture1 ?? '',
        postData.picture2 ?? '',
        postData.picture3
      ]);
    } else if (postData.picture2 !== null) {
      setImgList([postData.picture1 ?? '', postData.picture2]);
    } else if (postData.picture1 !== null) {
      setImgList([postData.picture1]);
    }
  }, [postData]);

  return (
    <ImgUploadContainer modalState={modalState.post.inPhoto}>
      <ImgUploadWrap>
        <CloseBtn right={0} onClick={imgUploadModalOff}>
          <IoClose size="28px" />
        </CloseBtn>
        <CloseBtn ref={uploadButtonRef} right={40} onClick={imgUpload}>
          <FiUpload size="20px" />
        </CloseBtn>
        <WhatWorkModal ref={workModalRef} onClick={imgUpload}>
          <div className="icon">
            <FiUpload size="20px" />
          </div>
          <div className="title">사진 추가</div>
          <div className="subtitle">또는 끌어서 놓습니다</div>
          <input
            type="file"
            accept="image/*"
            ref={inputfile}
            onChange={() => setIsImgUploading(isImgUploading + 1)}
            style={{ display: 'none' }}
          />
        </WhatWorkModal>
        <ImgPreview ref={imgPreviewModal}>{imgsetRendering()}</ImgPreview>
      </ImgUploadWrap>
    </ImgUploadContainer>
  );
};

export default ImgUploadModal;
