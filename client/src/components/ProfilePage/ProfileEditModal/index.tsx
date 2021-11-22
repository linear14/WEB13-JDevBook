import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';

import { modalStateStore } from 'recoil/store';
import palette from 'theme/palette';
import style from 'theme/style';
import useAlertModal from 'hooks/useAlertModal';

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

const SaveBtn = styled.div`
  width: 80px;
  height: 20px;
  padding: 8px ${style.padding.normal};

  border-radius: 8px;
  background-color: ${palette.green};
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

const ProfileEditModal = () => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  const [bio, setBio] = useState<string>('');
  const alertMessage = useAlertModal();

  const inputContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const saveBtnHandler = (e: React.MouseEvent) => {
    if (bio.length !== 0) alertMessage('성공적으로 수정되었습니다!');
    setModalState({ ...modalState, editProfile: false });
    setBio('');
  };

  return (
    <EditModalWrap modalState={modalState.editProfile}>
      <BioArea
        onChange={inputContents}
        value={bio}
        placeholder="자기소개를 적어주세요"
      />
      <SaveBtn onClick={saveBtnHandler}>저장</SaveBtn>
    </EditModalWrap>
  );
};

export default ProfileEditModal;
