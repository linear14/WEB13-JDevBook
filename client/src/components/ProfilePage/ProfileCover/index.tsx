import React, { useState, useEffect, useRef, Children } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { userDataStates, myJoinedGroupState, groupState } from 'recoil/store';
import palette from 'theme/palette';
import style from 'theme/style';
import useAlertModal from 'hooks/useAlertModal';
import fetchApi from 'api/fetch';
import { defaultGroup } from 'images/groupimg';

const ProfileCoverWrap = styled.div<{ imgsrc: string }>`
  width: 100%;
  min-width: 720px;
  max-width: 908px;
  height: 320px;
  background-image: url(${({ imgsrc }) => imgsrc});
  background-size: cover; // 100% 320px;

  display: flex;
  //flex-direction: column;
  justify-content: flex-end;

  /* img {
    width: 100%;
    min-width: 720px;
    max-width: 908px;
    height: 320px;
    object-fit: cover;
  } */
`;

const CoverImageEditBtn = styled.div`
  /* position: absolute;
  top: 45vh;
  left: 70vw; */
  /* position: fixed;
  right: 10%; */
  position: relative;
  top: 80%;
  right: 2.8%;
  width: 120px;
  height: 20px;
  margin-right: 40px;
  padding: 8px ${style.padding.normal};

  border-radius: 8px;
  background-color: ${palette.blue};
  color: ${palette.white};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    filter: brightness(95%);
  }

  &:active {
    filter: brightness(90%);
    font-size: 15px;
  }
`;

const ProfileCover = ({ src }: { src: string }) => {
  const inputfile = useRef() as React.MutableRefObject<HTMLInputElement>;
  const username = useRecoilValue(userDataStates).name;

  const openFileModal = (e: React.MouseEvent<HTMLDivElement>) => {
    inputfile.current.click();
  };

  return (
    <ProfileCoverWrap imgsrc={src || defaultGroup}>
      {/* <img src={src || defaultGroup} alt="프로필 커버 이미지" /> */}
      <CoverImageEditBtn onClick={openFileModal}>이미지 편집</CoverImageEditBtn>
      <input
        type="file"
        accept="image/*"
        ref={inputfile}
        // onChange={() => {
        //   uploadOneFile(inputfile.current.files, isImgUploading);
        // }}
        style={{ display: 'none' }}
      />
    </ProfileCoverWrap>
  );
};

export default ProfileCover;
