import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ProfilePhotoProps } from 'types/common';
import { defaultProfile } from 'images';
import useResetProfile from 'hooks/useResetProfile';

const ProfilePhotoWrap = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledProfilePhoto = styled.img<{ size?: string }>`
  width: ${(props) => props.size || '70px'};
  height: ${(props) => props.size || '70px'};
  border-radius: 50%;
`;

const ProfilePhoto = ({ userName, size }: ProfilePhotoProps) => {
  const profileImgURL = `https://github.com/${userName}.png`;
  const profileURL = `/profile/${userName}`;
  const resetProfile = useResetProfile();

  const photoClickHandler = (e: React.MouseEvent) => {
    resetProfile(userName);
  };

  return (
    <ProfilePhotoWrap to={profileURL} onClick={photoClickHandler}>
      <StyledProfilePhoto
        src={userName !== '' ? profileImgURL : defaultProfile}
        size={size}
        alt="프로필 사진"
        className="no-drag"
      />
    </ProfilePhotoWrap>
  );
};

export default ProfilePhoto;
