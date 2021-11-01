import React from 'react';
import styled from 'styled-components';

const SideBarContainer = styled.div`
  width: 280px;
  height: calc(100vh - 56px);
  position: fixed;
  display: flex;
  flex-direction: column;
`;

const SideBar: React.FC = ({ children }) => {
  return <SideBarContainer>{children}</SideBarContainer>;
};

export default SideBar;
