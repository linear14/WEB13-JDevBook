import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { rightModalStates } from 'recoil/store';
import GroupCard from 'components/GroupSelectPage/GroupSelectList/GroupCard';

const GroupSelectListContainer = styled.div<{ modalState: boolean }>`
  width: ${(props) => (props.modalState ? `100%` : `130%`)};
  box-sizing: border-box;
  padding-bottom: 40px;

  display: flex;
  flex-flow: row wrap;
`;

const GroupSelectList = () => {
  const rightModalState = useRecoilValue(rightModalStates).rightModalFlag;

  return (
    <GroupSelectListContainer modalState={rightModalState}>
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
      <GroupCard />
    </GroupSelectListContainer>
  );
};

export default GroupSelectList;
