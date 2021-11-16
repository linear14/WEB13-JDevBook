import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { AlertState } from 'recoil/store';
import palette from 'theme/palette';

const onAnimation = keyframes`
  0% {
    top: -70px;
    opacity: 0%;
  }
  50%{
    top: 20px;
    opacity: 100%;
  }
  100% {
    top: -70px;
    opacity: 0%;
  }
`;

const AlertModalWrap = styled.div<{ bgColor?: string; modalState: boolean }>`
  position: fixed;
  top: -70px;
  width: 500px;
  height: 50px;
  z-index: 7;

  border-radius: 8px;
  background-color: ${(props) => props.bgColor ?? `${palette.blue}`};
  color: ${palette.white};
  animation: ${onAnimation} 4s ease;

  display: ${(props) => (props.modalState ? `flex` : `none`)};
  justify-content: center;
  align-items: center;
`;

const AlertModal = () => {
  const alert = useRecoilValue(AlertState);

  return (
    <AlertModalWrap modalState={alert.modalState} bgColor={alert.bgColor}>
      {alert.comment}
    </AlertModalWrap>
  );
};

export default AlertModal;
