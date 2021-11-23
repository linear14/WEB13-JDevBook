import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { profileState } from 'recoil/store';
import palette from 'theme/palette';
import style from 'theme/style';

const ProfileInfoWrap = styled.div`
  flex: 1;

  background-color: ${palette.white};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ProfileTitle = styled.div`
  font-size: ${style.font.title};
`;

const ProfileBio = styled.div`
  color: ${palette.darkgray};
`;

const ProfileInfo = ({ userName }: { userName: string }) => {
  const profileData = useRecoilValue(profileState);

  return (
    <ProfileInfoWrap>
      <ProfileTitle>{userName}</ProfileTitle>
      <ProfileBio>안녕하세요 {userName}입니다.</ProfileBio>
    </ProfileInfoWrap>
  );
};

export default ProfileInfo;
