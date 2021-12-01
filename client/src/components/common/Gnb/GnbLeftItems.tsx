import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { mainLogo } from 'images';
import { modalStateStore } from 'recoil/store';

import UserSearchBar from './UserSearchBar';
import UserSearchModal from './UserSearchModal';

const MainLogo = styled(Link)`
  width: 40px;
  height: 40px;
  display: block;
  background-image: url(${mainLogo});
  background-size: 40px 40px;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;

  & > div:nth-child(2) {
    margin-left: 8px;
  }
`;

const GnbLeftItems = () => {
  const modalState = useRecoilValue(modalStateStore);
  return (
    <ItemContainer>
      <MainLogo to="/home" />
      <UserSearchBar />
      {modalState.searchUser && <UserSearchModal />}
    </ItemContainer>
  );
};

export default GnbLeftItems;
