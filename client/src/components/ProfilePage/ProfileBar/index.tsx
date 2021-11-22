import React from 'react';
import styled from 'styled-components';

import palette from 'theme/palette';
import style from 'theme/style';

import ProfileInfo from 'components/ProfilePage/ProfileBar/ProfileInfo';
import ProfilePhoto from 'components/ProfilePage/ProfileBar/ProfilePhoto';
import ProfileEdit from 'components/ProfilePage/ProfileBar/ProfileEdit';

const GroupNavContainer = styled.div`
  width: 100%;
  min-width: 720px;
  max-width: 908px;
  height: 180px;
  box-sizing: border-box;
  padding: 28px;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  background-color: ${palette.white};

  display: flex;
`;

const ProfileBar = () => {
  return (
    <GroupNavContainer>
      <ProfilePhoto userName="shinn338" />
      <ProfileInfo />
      <ProfileEdit />
    </GroupNavContainer>
  );
};

export default ProfileBar;
