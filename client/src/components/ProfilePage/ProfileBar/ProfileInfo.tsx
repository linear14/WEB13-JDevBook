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

const ProfileInfo = () => {
  const profileData = useRecoilValue(profileState);

  return (
    <ProfileInfoWrap>
      <ProfileTitle>{profileData.nickname}</ProfileTitle>
      <ProfileBio>
        {profileData.bio || '프로필 편집을 눌러 자기소개를 입력해보세요!'}
      </ProfileBio>
    </ProfileInfoWrap>
  );
};

export default ProfileInfo;
