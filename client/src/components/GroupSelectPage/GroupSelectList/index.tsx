import React from 'react';
import styled from 'styled-components';

import palette from 'theme/palette';

import GroupCard from 'components/GroupSelectPage/GroupSelectList/GroupCard';

const GroupSelectListContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 40px;

  display: flex;
  flex-flow: row wrap;
`;

const GroupSelectList = () => {
  return (
    <GroupSelectListContainer>
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
