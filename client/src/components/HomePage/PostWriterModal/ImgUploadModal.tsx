import React from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { useRecoilState } from 'recoil';

import { modalVisibleStates } from 'recoil/store';
import palette from 'theme/palette';

const ImgUploadContainer = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 408px;
  width: 532px;
  height: 200px;
  box-sizing: border-box;
  padding: 8px;

  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${palette.darkgray};

  display: ${(props) => (props.modalState ? 'block' : 'none')};
`;

const ImgUploadWrap = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 8px;
  background-color: ${palette.lightgray};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 36px;
  height: 36px;
  box-sizing: border-box;
  margin: 16px;

  border-radius: 50%;
  border-style: solid;
  border-width: 1px;
  border-color: ${palette.darkgray};
  background-color: ${palette.white};
  color: ${palette.darkgray};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const ImgUploadModal = () => {
  const [modalState, setModalState] = useRecoilState(modalVisibleStates);

  const imgUploadModalToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    setModalState({ ...modalState, postInPhoto: !modalState.postInPhoto });
  };

  return (
    <ImgUploadContainer modalState={modalState.postInPhoto}>
      <ImgUploadWrap>
        <CloseBtn onClick={imgUploadModalToggle}>
          <IoClose size="28px" />
        </CloseBtn>
      </ImgUploadWrap>
    </ImgUploadContainer>
  );
};

export default ImgUploadModal;
