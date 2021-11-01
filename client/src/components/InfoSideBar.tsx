import React from 'react';
import styled from 'styled-components';

const InfoSideBarContainer = styled.div`
  height: 200px;
  width: inherit;
  background-color: cyan;
`;

const InfoSideBar: React.FC = () => {
  return <InfoSideBarContainer>InfoSideBar</InfoSideBarContainer>;
};

export default InfoSideBar;
