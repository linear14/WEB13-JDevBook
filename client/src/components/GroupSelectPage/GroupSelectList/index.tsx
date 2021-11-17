import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { rightModalStates, groupListState } from 'recoil/store';
import fetchApi from 'api/fetch';

import GroupCard from 'components/GroupSelectPage/GroupSelectList/GroupCard';
import { IGroup } from 'types/group';

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

  const fetchList = async () => {
    const groupList: IGroup[] = await fetchApi.getGroupList();
    setGroupList(groupList);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <GroupSelectListContainer modalState={rightModalState}>
      {groupList.map((group) => (
        <GroupCard key={group.idx} group={group} />
      ))}
    </GroupSelectListContainer>
  );
};

export default GroupSelectList;
