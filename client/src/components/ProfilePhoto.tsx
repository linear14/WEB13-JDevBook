import React from 'react';
import styled from 'styled-components';

const StyledProfilePhoto = styled.img`
  border-radius: 50%;
`;

type ProfilePhotoProps = {
  src: string;
};

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ src, children }) => {
  return <StyledProfilePhoto src={src} alt='프로필 사진'></StyledProfilePhoto>;
};

export default ProfilePhoto;
