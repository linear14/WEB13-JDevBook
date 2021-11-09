import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { IoClose } from 'react-icons/io5';

import palette from 'theme/palette';
import { modalVisibleStates } from 'recoil/store';

const ModalTitleWrap = styled.div`
  width: 95%;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    font-size: 20px;
    font-weight: bold;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  right: 12px;
  width: 36px;
  height: 36px;
  box-sizing: border-box;
  margin-right: 20px;
  border-radius: 50%;
  background-color: ${palette.gray};
  color: ${palette.darkgray};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const ModalTitle = () => {
  const [modalState, setModalState] = useRecoilState(modalVisibleStates);

  const PostWriterModalToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    setModalState({ ...modalState, postWriter: !modalState.postWriter });
  };

  return (
    <ModalTitleWrap>
      <div>게시물 만들기</div>
      <CloseBtn onClick={PostWriterModalToggle}>
        <IoClose size="28px" />
      </CloseBtn>
    </ModalTitleWrap>
  );
};

export default ModalTitle;
