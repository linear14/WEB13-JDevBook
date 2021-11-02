import React from 'react';
import styled from 'styled-components';
import { ProfilePhoto } from '.';

const InfoSideBarContainer = styled.div`
  height: 200px;
  width: inherit;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
`;

const ProfileWrap = styled.div`
  display: flex;
`;

const InfoSideBar: React.FC = () => {
  return (
    <InfoSideBarContainer>
      <ProfilePhoto src=''></ProfilePhoto>
    </InfoSideBarContainer>
  );
};

export default InfoSideBar;
