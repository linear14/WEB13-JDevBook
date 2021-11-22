import React from 'react';
import { useRecoilState } from 'recoil';
import { modalStateStore } from 'recoil/store';
import styled from 'styled-components';

import palette from 'theme/palette';
import style from 'theme/style';

const ProfileEditWrap = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ProfileEditBtn = styled.div`
  width: 120px;
  height: 20px;
  margin-right: 40px;
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

const ProfileEdit = () => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);

  const toggleModalHandler = (e: React.MouseEvent) => {
    setModalState({ ...modalState, editProfile: !modalState.editProfile });
  };

  return (
    <ProfileEditWrap className="no-drag">
      <ProfileEditBtn onClick={toggleModalHandler}>프로필 편집</ProfileEditBtn>
    </ProfileEditWrap>
  );
};

export default ProfileEdit;
