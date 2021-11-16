import React from 'react';
import styled from 'styled-components';

import palette from 'theme/palette';
import style from 'theme/style';

const GroupNavMiddleWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const GroupEnterBtn = styled.div`
  width: 120px;
  height: 20px;
  margin-right: 40px;
  padding: 8px ${style.padding.normal};

  border-radius: 8px;
  background-color: ${palette.green};
  color: ${palette.white};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    filter: brightness(95%);
  }

  &:active {
    filter: brightness(90%);
    font-size: 15px;
  }
`;

const GroupNavMiddle = () => {
  return (
    <GroupNavMiddleWrap>
      <GroupEnterBtn className="no-drag">그룹 가입</GroupEnterBtn>
    </GroupNavMiddleWrap>
  );
};

export default GroupNavMiddle;
