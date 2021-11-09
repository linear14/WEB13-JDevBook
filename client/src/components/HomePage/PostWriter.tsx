import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { userData } from 'recoil/modal';

import palette from 'theme/palette';
import { iconPhoto } from 'images';

import { ProfilePhoto } from 'components';

const PostWriterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 680px;
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
  align-items: center;
  width: 95%;

  margin: 10px 0;
`;

const StyledBtn = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 5px 15px;

  &:hover {
    cursor: pointer;
    background-color: ${palette.gray};
    transition: all 0.2s;
  }

  img {
    height: 30px;
    width: 30px;
    margin-right: 10px;
  }

  div {
    color: ${palette.darkgray};
  }
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
        <StyledBtn>
          <img src={iconPhoto} alt="photo 아이콘" />
          <div>Photo</div>
        </StyledBtn>
      </ButtonsWrap>
    </PostWriterBox>
  );
};

export default PostWriter;
