import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { userData } from 'recoil/store';
import palette from 'theme/palette';

const ModalContentsContainer = styled.div`
  width: 100%;
  height: 200px;
  margin: 16px 0;

  display: flex;
  flex-direction: column;
`;

const ContentsInput = styled.textarea`
  height: 200px;

  border: none;
  outline: none;
  resize: none;
  background-color: ${palette.white};
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18px;
`;

const ModalContents = () => {
  const userdata = useRecoilValue(userData);

  return (
    <ModalContentsContainer>
      <ContentsInput
        placeholder={`${userdata.name}님, 무슨 생각을 하고 계신가요?`}
      />
    </ModalContentsContainer>
  );
};

export default ModalContents;
