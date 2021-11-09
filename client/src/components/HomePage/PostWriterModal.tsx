import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { modalVisibleStates, userData } from 'recoil/store';
import palette from 'theme/palette';

const PostWriterModalOverlay = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.2);

  display: ${(props) => (props.modalState ? 'flex' : 'none')};
`;

const PostWriterModalInner = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 160px;
  width: 600px;
  height: 624px;
  z-index: 6;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 8px;
  background-color: ${palette.white};

  display: ${(props) => (props.modalState ? 'flex' : 'none')};
`;

const PostWriterModal = () => {
  const [modalState, setModalState] = useRecoilState(modalVisibleStates);
  const [userdata, setUserData] = useRecoilState(userData);

  const PostWriterModalToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    setModalState({ ...modalState, postWriter: !modalState.postWriter });
  };

  return (
    <>
      <PostWriterModalOverlay
        modalState={modalState.postWriter}
        onClick={PostWriterModalToggle}
      />
      <PostWriterModalInner
        modalState={modalState.postWriter}
      ></PostWriterModalInner>
    </>
  );
};

export default PostWriterModal;
