import React from 'react';
import styled from 'styled-components';

import palette from 'theme/palette';

import { ProfilePhoto } from 'components/common';

const PostInfoWrap = styled.div`
  display: flex;
`;

const PostInfo = () => {
  return (
    <PostInfoWrap>
      <ProfilePhoto size="40px" />
      <div></div>
    </PostInfoWrap>
  );
};

export default PostInfo;
