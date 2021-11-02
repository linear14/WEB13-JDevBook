import React from 'react';
import styled from 'styled-components';

const GroupSideBarContainer = styled.div`
  flex: 1;
  width: inherit;
  background: purple;
`;

const GroupSideBar: React.FC = () => {
  return <GroupSideBarContainer>GroupSideBar</GroupSideBarContainer>;
};

export default GroupSideBar;
