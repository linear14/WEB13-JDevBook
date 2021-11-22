import React from 'react';
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
  return (
    <ProfileEditWrap>
      <ProfileEditBtn>프로필 편집</ProfileEditBtn>
    </ProfileEditWrap>
  );
};

export default ProfileEdit;
