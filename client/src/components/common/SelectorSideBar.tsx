import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { rightModalStates, userData } from 'recoil/modal';

const SelectorSideBarContainer = styled.div<any>`
  width: inherit;
  height: inherit;
  box-shadow: -5px 2px 5px 0px rgb(0 0 0 / 24%);
`;

const SelectorSideBar: React.FC = () => {
  const rightModalState = useRecoilValue(rightModalStates);

  if (rightModalState.rightModalFlag && rightModalState.selectorFlag) {
    return (
      <SelectorSideBarContainer>This is SelectorSideBar</SelectorSideBarContainer>
    );
  } else return null;
};

export default SelectorSideBar;
