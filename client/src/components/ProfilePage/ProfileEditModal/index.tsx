import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';

import { modalStateStore, profileState } from 'recoil/store';
import palette from 'theme/palette';
import style from 'theme/style';
import useAlertModal from 'hooks/useAlertModal';
import fetchApi from 'api/fetch';

const EditModalAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const EditModalWrap = styled.div<{ modalState: boolean }>`
  position: relative;
  top: -244px;
  left: 312px;
  box-sizing: border-box;
  padding: ${style.padding.normal};

  background-color: ${palette.white};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;

  display: ${(props) => (props.modalState ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-end;
  animation: ${EditModalAnimation} 0.2s;
`;

const BioArea = styled.textarea`
  width: 300px;
  height: 100px;
  box-sizing: border-box;
  padding: ${style.padding.normal};
  margin-bottom: ${style.margin.small};

  border: none;
  outline: none;
  resize: none;
  background-color: ${palette.white};
  font-size: ${style.font.normal};

  overscroll-behavior: none;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #bfbfbf;
  }
  :-ms-input-placeholder {
    color: #bfbfbf;
  }
`;

const BtnWrap = styled.div`
  display: flex;
`;

const StyledBtn = styled.div<{ saveBtn: boolean }>`
  width: 60px;
  height: 20px;
  padding: 8px ${style.padding.normal};
  margin: 0 ${style.margin.smallest};

  border-radius: 8px;
  background-color: ${(props) =>
    props.saveBtn ? palette.green : palette.gray};
  color: ${(props) => (props.saveBtn ? palette.white : palette.black)};

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

const ProfileEditModal = () => {
  const [profileData, setProfileData] = useRecoilState(profileState);
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  const [bio, setBio] = useState<string>('');
  const alertMessage = useAlertModal();

  const inputContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const saveBtnHandler = async (e: React.MouseEvent) => {
    if (bio.length !== 0) {
      const result = await fetchApi.updateBio(profileData.nickname, bio.trim());
      result
        ? alertMessage('성공적으로 수정되었습니다!')
        : alertMessage(
            '알 수 없는 이유로 수정에 실패하였습니다.',
            palette.alert
          );
    } else {
      return alertMessage('내용을 입력하세요.', palette.alert);
    }
    setProfileData({ ...profileData, bio: bio.trim() });
    setBio('');
    setModalState({ ...modalState, editProfile: false });
  };

  const cancelBtnHandler = (e: React.MouseEvent) => {
    setBio('');
    setModalState({ ...modalState, editProfile: false });
  };

  const bioLengthCheck = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const maxLength = 100;

    if (bio.length > maxLength) {
      let contents = bio;
      alertMessage(
        `자기소개는 ${maxLength}글자를 넘을 수 없습니다.`,
        palette.alert
      );
      while (contents.length > maxLength) {
        contents = contents.slice(0, -1);
      }
      setBio(contents);
    }
  };

  return (
    <EditModalWrap modalState={modalState.editProfile}>
      <BioArea
        onChange={inputContents}
        onKeyUp={bioLengthCheck}
        value={bio}
        placeholder="자기소개를 적어주세요."
      />
      <BtnWrap>
        <StyledBtn onClick={saveBtnHandler} saveBtn={true}>
          저장
        </StyledBtn>
        <StyledBtn onClick={cancelBtnHandler} saveBtn={false}>
          취소
        </StyledBtn>
      </BtnWrap>
    </EditModalWrap>
  );
};

export default ProfileEditModal;
