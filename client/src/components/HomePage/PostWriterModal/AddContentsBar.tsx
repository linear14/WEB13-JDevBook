import React from 'react';
import styled from 'styled-components';

import palette from 'theme/palette';
import { iconPhoto } from 'images/icons';

const AddContentsBarWrap = styled.div`
  width: 95%;
  height: 60px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.36) 0px 1px 4px;

  display: flex;
  align-items: center;
  p {
    width: 50%;
    box-sizing: border-box;
    padding-left: 20px;

    font-weight: bold;
  }
`;

const AddContentsBtnWrap = styled.div`
  display: flex;
`;

const ContentsBtn = styled.div`
  width: 45px;
  height: 45px;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${palette.gray};
    transition: all 0.1s;
  }

  img {
    width: 70%;
    height: 70%;
  }
`;

const AddContentsBar = () => {
  return (
    <AddContentsBarWrap>
      <p>게시물에 추가</p>
      <AddContentsBtnWrap>
        <ContentsBtn>
          <img src={iconPhoto} alt="사진 아이콘" />
        </ContentsBtn>
      </AddContentsBtnWrap>
    </AddContentsBarWrap>
  );
};

export default AddContentsBar;
