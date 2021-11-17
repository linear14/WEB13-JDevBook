import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import palette from 'theme/palette';
import style from 'theme/style';
import { os } from 'images/groupimg';

const GroupCardWrap = styled.div`
  width: 244px;
  height: 244px;
  margin: 18px;

  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;

  display: flex;
  flex-direction: column;
`;

const GroupImg = styled(Link)`
  width: 100%;
  height: 65%;

  img {
    width: 100%;
    height: 100%;

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

const GroupSelectorWrap = styled.div`
  width: 100%;
  height: 35%;
  box-sizing: border-box;
  padding: ${style.padding.normal};

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top: solid 1px ${palette.gray};
  background-color: ${palette.white};

  display: flex;
  flex-direction: column;
`;

const GroupName = styled.div`
  margin-bottom: ${style.margin.small};
  font-size: ${style.font.normal};
`;

const GroupJoinBtn = styled.div`
  width: 100%;
  height: 30px;

  border-radius: 8px;
  background-color: ${palette.lightgray};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    filter: brightness(95%);
  }

  &:active {
    font-size: 15px;
    filter: brightness(90%);
  }
`;

const GroupCard = () => {
  return (
    <GroupCardWrap>
      <GroupImg to="/group">
        <img src={os} alt="그룹 이미지" />
      </GroupImg>
      <GroupSelectorWrap>
        <GroupName>그룹 이름</GroupName>
        <GroupJoinBtn className="no-drag">그룹 추가</GroupJoinBtn>
      </GroupSelectorWrap>
    </GroupCardWrap>
  );
};

export default GroupCard;
