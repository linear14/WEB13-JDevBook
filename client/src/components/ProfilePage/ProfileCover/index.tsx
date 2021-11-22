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

const ProfileCover = ({
  src,
  profileName
}: {
  src: string;
  profileName: string;
}) => {
  const inputfile = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [userData, setUserData] = useRecoilState(userDataStates);
  const alertMessage = useAlertModal();

  const openFileModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (userData.name !== profileName)
      return alertMessage('프로필 소유자가 아닙니다.', palette.alert);
    inputfile.current.click();
  };

  const uploadOneFile = async () => {
    const filelist: FileList | null = inputfile.current.files;
    if (!filelist || filelist.length === 0)
      return alertMessage('파일을 가져오지 못했습니다.', palette.alert);

    if (filelist[0].type.match(/image\/*/) === null)
      return alertMessage('이미지 파일이 아닙니다.', palette.alert);

    const imglist: FileList = filelist; //inputfile.current.files;
    const s3fileRes = await fetchApi.uploadImg(imglist);

    if (!s3fileRes.save) return alertMessage('이미지 업로드 실패');

    // fetch, db 건들고 userdata 업데이트 하고
    // src는 해당 유저 getUserData도 만들어야겠네
    const { check } = await fetchApi.updateProfile({
      idx: userData.idx,
      nickname: userData.name,
      // profile은 github링크로 사용
      bio: userData.bio,
      cover: s3fileRes.file.location
    });

    if (check) {
      setUserData({
        ...userData,
        cover: s3fileRes.file.location
      });
    } else {
      return alertMessage('프로필 업데이트를 하지 못했습니다.', palette.alert);
    }
  };

  return (
    <ProfileCoverWrap imgsrc={src || defaultGroup}>
      {/* <img src={src || defaultGroup} alt="프로필 커버 이미지" /> */}
      <CoverImageEditBtn onClick={openFileModal}>이미지 편집</CoverImageEditBtn>
      <input
        type="file"
        accept="image/*"
        ref={inputfile}
        onChange={uploadOneFile}
        style={{ display: 'none' }}
      />
    </ProfileCoverWrap>
  );
};

export default ProfileCover;
