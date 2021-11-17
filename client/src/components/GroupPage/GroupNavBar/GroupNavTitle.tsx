import React from 'react';
import styled from 'styled-components';

import palette from 'theme/palette';
import style from 'theme/style';

const GroupNavTitleWrap = styled.div`
  padding-left: 40px;

  background-color: ${palette.white};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const GroupTitle = styled.div`
  font-size: ${style.font.title};
`;

const GroupMemberNum = styled.div`
  margin: 10px 0 0 15px;
  color: ${palette.darkgray};
`;

const GroupNavTitle = () => {
  return (
    <GroupNavTitleWrap>
      <GroupTitle>그룹명</GroupTitle>
      <GroupMemberNum>멤버 n명</GroupMemberNum>
    </GroupNavTitleWrap>
  );
};

export default GroupNavTitle;
