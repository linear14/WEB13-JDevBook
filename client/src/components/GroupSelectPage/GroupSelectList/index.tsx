import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { rightModalStates, groupListState } from 'recoil/store';
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
  const [groupList, setGroupList] = useRecoilState(groupListState);

  return (
    <GroupSelectListContainer modalState={rightModalState}>
      {groupList.map((group) => (
        <GroupCard group={group} />
      ))}
    </GroupSelectListContainer>
  );
};

export default GroupSelectList;
