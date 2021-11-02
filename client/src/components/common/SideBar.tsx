import React from 'react';
import styled, { css } from 'styled-components';

const SideBarContainer = styled.div<SideBarProps>`
  width: 340px;
  height: calc(100vh - 56px);
  top: 56px;
  ${(props) => (props.isLeft ? `left: 0` : `right: 0`)};
  position: fixed;
  display: flex;
  flex-direction: column;
`;

type SideBarProps = {
  isLeft: boolean;
};

const SideBar: React.FC<SideBarProps> = ({ isLeft, children }) => {
  return <SideBarContainer isLeft={isLeft}>{children}</SideBarContainer>;
};

export default SideBar;
