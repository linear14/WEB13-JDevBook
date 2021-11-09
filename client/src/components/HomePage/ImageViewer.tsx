import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { imageViewerState as ivState } from 'recoil/store';

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: black;
  z-index: 1;
`;

const ButtonWrap = styled.div`
  width: 100%;
  text-align: right;

  svg {
    margin: 32px;
    color: white;
    font-size: 32px;
  }
`;

const ImageViewer = () => {
  const [imageViewerState, setImageViewerState] = useRecoilState(ivState);
  useEffect(() => {
    const [x, y] = [window.scrollX, window.scrollY];
    window.onscroll = () => {
      window.scrollTo(x, y);
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <Container>
      <ButtonWrap
        onClick={() => {
          setImageViewerState({ ...imageViewerState, isOpen: false });
        }}
      >
        <MdClose />
      </ButtonWrap>
    </Container>
  );
};

export default ImageViewer;
