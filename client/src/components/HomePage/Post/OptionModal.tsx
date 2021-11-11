import React, { MouseEventHandler, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { modalVisibleStates, userData } from 'recoil/store';
import palette from 'theme/palette';

const OptionModalContainer = styled.div`
  width: 240px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background: ${palette.white};
  border-radius: 8px;
  position: absolute;
  top: 48px;
  right: 16px;
  box-sizing: border-box;
  padding: 8px;

  div {
    padding: 12px;
    transition: 0.2s ease-in;

    &:hover {
      background: ${palette.gray};
      border-radius: 8px;
    }
  }
`;

const OptionModal = () => {
  const [modalState, setModalState] = useRecoilState(modalVisibleStates);

  const modal = React.useRef<HTMLDivElement>(null);
  const closeModal = (e: any, force?: boolean) => {
    if (!force && modal.current?.contains(e.target)) {
      return;
    }
    setModalState({ ...modalState, postOption: -1 });
  };

  useEffect(() => {
    document.addEventListener('click', closeModal);

    return () => {
      document.removeEventListener('click', closeModal);
    };
  }, []);

  return (
    <OptionModalContainer ref={modal}>
      <div>게시글 수정</div>
      <div style={{ color: palette.alert }}>게시글 삭제</div>
    </OptionModalContainer>
  );
};

export default OptionModal;
