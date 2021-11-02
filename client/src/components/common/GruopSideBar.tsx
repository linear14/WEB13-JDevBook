import React from 'react';
import styled from 'styled-components';
import iconSearch from 'images/icon-search.svg';

const GroupSideBarContainer = styled.div`
  flex: 1;
  width: inherit;
  background: purple;
  display: flex;
  flex-direction: column;
`;

const SearchBarWrap = styled.div`
  height: 40px;
  margin: 30px 50px;
  display: flex;
  background: #f0f2f5;
  border-radius: 24px;

  img {
    width: 20px;
    height: 20px;
    margin: 10px 10px 10px 20px;
  }

  input {
    flex: 1;
    outline: none;
    background: none;
    border: none;
    margin-left: 4px;
    font-size: 1rem;

    &::placeholder {
      font-size: 1rem;
    }
  }
`;

const GroupList = styled.div`
  flex: 1;
  margin: 0 50px 30px 50px;
  background: #f0f2f5;
`;

const GroupSideBar: React.FC = () => {
  return (
    <GroupSideBarContainer>
      <SearchBarWrap>
        <img src={iconSearch} alt="Search 아이콘" />
        <input type="text" placeholder="search group" />
      </SearchBarWrap>
      <GroupList></GroupList>
    </GroupSideBarContainer>
  );
};

export default GroupSideBar;
