import styled from 'styled-components';

import { defaultGroup } from 'images/groupimg';

const ProfileCoverWrap = styled.div`
  width: 100%;
  min-width: 720px;
  max-width: 908px;
  height: 320px;

  display: flex;
  justify-content: flex-end;

  img {
    width: 100%;
    min-width: 720px;
    max-width: 908px;
    height: 320px;
    object-fit: cover;
  }
`;

const ProfileCover = ({ src }: { src: string }) => {
  return (
    <ProfileCoverWrap>
      <img src={src || defaultGroup} alt="프로필 커버 이미지" />
    </ProfileCoverWrap>
  );
};

export default ProfileCover;
