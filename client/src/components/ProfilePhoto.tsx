import React from 'react';
import styled from 'styled-components';

const StyledProfilePhoto = styled.img<ProfilePhotoProps>`
  width: ${(props) => props.size || '25px'};
  height: ${(props) => props.size || '25px'};
  border-radius: 50%;
`;

type ProfilePhotoProps = {
  src: string;
  size?: string;
};

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ src, size, children }) => {
  return <StyledProfilePhoto src={src} size={size} alt='프로필 사진'></StyledProfilePhoto>;
};

export default ProfilePhoto;
