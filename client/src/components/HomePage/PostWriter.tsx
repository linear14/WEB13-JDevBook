import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { userData } from 'recoil/modal';

import palette from 'theme/palette';

import { ProfilePhoto } from 'components';

const PostWriterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 680px;
  height: 125px;
  margin: 35px 0;

  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 0px 5px;
  background-color: ${palette.white};
`;

const InputWrap = styled.div`
  display: flex;
  width: 95%;

  margin: 10px 0px;
`;

const ModalCallBtn = styled.div`
  width: 100%;
  margin: 0 0 0 10px;
  padding: 10px 15px;
  background-color: ${palette.gray};
  border-radius: 25px;

  color: ${palette.darkgray};

  &:hover {
    cursor: pointer;
  }
`;

const Line = styled.div`
  width: 95%;
  border-color: ${palette.gray};
  border-width: 1px;
  border-style: solid;
`;

const ButtonsWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 95%;
  height: 100%;

  margin: 10px 0px;
`;

const StyledBtn = styled.div`
  height: inherit;
  width: 100px;
  background-color: beige;
`;

const PostWriter = () => {
  const [userdata, setUserdata] = useRecoilState(userData);

  return (
    <PostWriterBox>
      <InputWrap>
        <ProfilePhoto size="40px" src="" />
        <ModalCallBtn>What's on your mind, {userdata.username}?</ModalCallBtn>
      </InputWrap>
      <Line />
      <ButtonsWrap>
        <StyledBtn></StyledBtn>
      </ButtonsWrap>
    </PostWriterBox>
  );
};

export default PostWriter;
