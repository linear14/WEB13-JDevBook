import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { modalStateStore, profileState, userDataStates } from 'recoil/store';
import palette from 'theme/palette';
import style from 'theme/style';

const ProfileEditWrap = styled.div<{ editState: boolean }>`
  display: ${(props) => (props.editState ? 'flex' : 'none')};
  align-items: flex-end;
`;

const ProfileEditBtn = styled.div`
  width: 120px;
  height: 20px;
  margin-right: 20px;
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
  const userData = useRecoilValue(userDataStates);
  const profileData = useRecoilValue(profileState);
  const [editState, setEditState] = useState<boolean>(false);

  const toggleModalHandler = (e: React.MouseEvent) => {
    setModalState({ ...modalState, editProfile: !modalState.editProfile });
  };

  useEffect(() => {
    if (userData.name === profileData.nickname) setEditState(true);
    else setEditState(false);
  }, [profileData]);

  return (
    <ProfileEditWrap editState={editState} className="no-drag">
      <ProfileEditBtn onClick={toggleModalHandler}>프로필 편집</ProfileEditBtn>
    </ProfileEditWrap>
  );
};

export default ProfileEdit;
