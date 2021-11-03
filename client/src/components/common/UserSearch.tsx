import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../../images/main-logo.png';
import styled, { css } from 'styled-components';
import iconSearch from '../../images/icon-search.svg';
import { MdArrowBack } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { modalVisibleStates } from '../../recoil/modal';

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

const ModalHeader = styled(FlexBox)`
  svg {
    color: #656565;
  }
  margin-right: 8px;
`;

const UserSearchBarContainer = styled.div`
  width: 240px;
  height: 40px;
  background: #f0f2f5;
  border-radius: 24px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  box-sizing: border-box;

  img {
    width: 22px;
    height: 22px;
  }

  input {
    flex: 1;
    outline: none;
    background: none;
    border: none;
    margin-left: 4px;
    font-size: 1rem;

    &::placeholder {
      font-size: 0.875rem;
    }
  }
`;

const SearchBarContainerModal = styled(UserSearchBarContainer)`
  margin-left: 8px;
  width: 100%;
`;

const UserSearchModalContainer = styled.div`
  width: 320px;
  max-height: 600px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  background: white;
  border-radius: 12px;
  position: fixed;
  top: 0;
  left: 0;
  padding: 8px;
  box-sizing: border-box;

  svg {
    font-size: 22px;
  }
`;

const HoverRound = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #eeeeee;
    border-radius: 100%;
  }
`;

const SearchModalBody = styled.div`
  width: 100%;
  & > p {
    text-align: center;
    color: #888888;
  }
`;

const UserSearchBar: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(modalVisibleStates);
  return (
    <>
      <Link to="/home">
        <img src={mainLogo} />
      </Link>
      <UserSearchBarContainer
        onClick={() => setModalState({ ...modalState, searchUser: true })}
      >
        <img src={iconSearch} />
        <input type="text" placeholder="Search User" readOnly />
      </UserSearchBarContainer>
    </>
  );
};

const UserSearchModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(modalVisibleStates);

  const modal = React.useRef<HTMLDivElement>(null);

  const closeModal = (e: any, force?: boolean) => {
    if (!force && modal.current?.contains(e.target)) {
      return;
    }
    setModalState({ ...modalState, searchUser: false });
  };

  useEffect(() => {
    document.addEventListener('click', closeModal);
    return () => {
      document.removeEventListener('click', closeModal);
    };
  });

  return (
    <UserSearchModalContainer ref={modal}>
      <ModalHeader>
        <HoverRound
          onClick={(e) => {
            e.stopPropagation();
            closeModal(e, true);
          }}
        >
          <MdArrowBack />
        </HoverRound>
        <SearchBarContainerModal>
          <input type="text" placeholder="Search User" />
        </SearchBarContainerModal>
      </ModalHeader>
      <SearchModalBody>
        <p>No Result</p>
      </SearchModalBody>
    </UserSearchModalContainer>
  );
};

export { UserSearchBar, UserSearchModal };
