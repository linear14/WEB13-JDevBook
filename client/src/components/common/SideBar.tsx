import React from 'react';
import styled from 'styled-components';

const SideBarContainer = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  width: 340px;
  height: calc(100vh - 56px);
  z-index: 1;

  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1040px) {
    display: none;
  }
`;

const SideBar = ({ children }: { children?: React.ReactNode }) => {
  return <SideBarContainer>{children}</SideBarContainer>;
};

export default SideBar;
