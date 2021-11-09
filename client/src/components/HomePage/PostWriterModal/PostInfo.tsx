import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { userData } from 'recoil/store';
import palette from 'theme/palette';

import { ProfilePhoto } from 'components/common';

const PostInfoWrap = styled.div`
  width: 95%;

  display: flex;
  align-items: center;

  div {
    margin: 0 12px;
    font-size: 16px;
    font-weight: bold;
  }
`;

const PostInfo = () => {
  const [userdata, setUserData] = useRecoilState(userData);

  return (
    <PostInfoWrap>
      <ProfilePhoto src="" size="44px" />
      <div>{userdata.name}</div>
    </PostInfoWrap>
  );
};

export default PostInfo;
