import { Children, useEffect } from 'react';
import styled, { css } from 'styled-components';
import githubLogo from '../images/githubLogo.png';

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledImg = styled.img`
  width: 30px;
  height: auto;
`;

function LoginPage() {
  const loginGithub = () => {
    fetch('/oauth/login')
      .then((res) => res.json())
      .then((loginLink) => {
        window.location.href = loginLink;
      });
  };

  return (
    <div>
      <StyledButton onClick={loginGithub}>
        <StyledImg src={githubLogo} />
        Login with Github
      </StyledButton>
    </div>
  );
}

export default LoginPage;
