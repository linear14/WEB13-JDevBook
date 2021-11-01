import React from 'react';
import styled, { keyframes } from 'styled-components';

const Greeter = () => {
  const reactArray = "JDevBook".split("");
  
  return (
    <Content>
    {reactArray.map((item, index):any => (
        <span key={index}>{item}</span>
    ))}
    </Content>
  )
}

const Animation = keyframes`
  0% { opacity: 0; transform: translateY(-30px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px); }
  25% { opacity: 1;  transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px); }
  75% { opacity: 1;  transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px); }
  100% { opacity: 0;  transform: translateY(-30px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px); }
`;

const Content = styled.span`
  display: inline-block;
  span {
      display: inline-block;
      opacity: 0;
      animation-name: ${Animation};
      animation-duration: 4s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
  }

  span:nth-child(1) {
    animation-delay: 0.1s;
  }
  span:nth-child(2) {
    animation-delay: 0.2s;
  }
  span:nth-child(3) {
    animation-delay: 0.3s;
  }
  span:nth-child(4) {
    animation-delay: 0.4s;
  }
  span:nth-child(5) {
    animation-delay: 0.5s;
  }
  span:nth-child(6) {
    animation-delay: 0.6s;
  }
  span:nth-child(7) {
    animation-delay: 0.7s;
  }
  span:nth-child(8) {
    animation-delay: 0.8s;
  }  

  font-size:50px;
`;

export default Greeter;