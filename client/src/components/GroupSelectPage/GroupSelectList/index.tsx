import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { rightModalStates, groupListState } from 'recoil/store';
import fetchApi from 'api/fetch';

import GroupCard from 'components/GroupSelectPage/GroupSelectList/GroupCard';
import { IGroup } from 'types/group';

const listAnimation = keyframes`
  0% {
    width: 100%;
  }
  100% {
    width: 130%;
  }
`;

const GroupSelectListContainer = styled.div<{ modalState: boolean }>`
  width: ${(props) => (props.modalState ? `100%` : `130%`)};
  box-sizing: border-box;
  padding-bottom: 40px;
  z-index: 1;

  display: flex;
  flex-flow: row wrap;
  ${(props) =>
    props.modalState
      ? ''
      : css`
          animation: ${listAnimation} 0.5s;
        `};
`;

const GroupSelectList = () => {
  const rightModalState = useRecoilValue(rightModalStates).rightModalFlag;
  const [groupList, setGroupList] = useRecoilState(groupListState);

  const fetchList = async () => {
    const groupList: IGroup[] = await fetchApi.getGroupList();
    setGroupList(groupList);
  };

  useEffect(() => {
    if (groupList.length === 0) fetchList();
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
