import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { userDataStates, myJoinedGroupState, groupState } from 'recoil/store';
import palette from 'theme/palette';
import style from 'theme/style';
import useAlertModal from 'hooks/useAlertModal';
import fetchApi from 'api/fetch';
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
