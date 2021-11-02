import React from 'react';
import styled from 'styled-components';

const LoginBox = () => {
    return (
        <Wrapper>
            로그인 박스
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 50vw;
  background-color: #FFF;
  height: 50%;
  border-radius: 50px;
`;

export default LoginBox;