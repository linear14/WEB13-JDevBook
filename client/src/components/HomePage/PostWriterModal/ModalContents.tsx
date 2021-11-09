import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { modalVisibleStates, userData } from 'recoil/store';
import palette from 'theme/palette';

const ModalContentsContainer = styled.div`
  width: 100%;
  height: 300px;
  margin: 16px 0;

  display: flex;
  flex-direction: column;
`;

const ContentsInput = styled.textarea<{ modalState: boolean }>`
  height: ${(props) => (props.modalState ? '25%' : '95%')};

  border: none;
  outline: none;
  resize: none;
  background-color: ${palette.white};
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18px;

  overscroll-behavior: none;
`;

const ModalContents = () => {
  const modalState = useRecoilValue(modalVisibleStates);
  const userdata = useRecoilValue(userData);

  return (
    <ModalContentsContainer>
      <ContentsInput
        placeholder={`${userdata.name}님, 무슨 생각을 하고 계신가요?`}
        modalState={modalState.postInPhoto}
      />
    </ModalContentsContainer>
  );
};

export default ModalContents;
