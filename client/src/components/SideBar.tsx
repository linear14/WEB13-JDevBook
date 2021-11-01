import React from 'react';
import styled from 'styled-components';

const SideBarContainer = styled.div`
  width: 280px;
  height: calc(100vh - 56px);
  position: relative;
  background: green;
`;

const SideBar: React.FC = ({ children }) => {
  return <SideBarContainer>{children}</SideBarContainer>;
};
