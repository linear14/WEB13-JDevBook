import React from 'react';
import styled from 'styled-components';
import iconSearch from 'images/icon-search.svg';
import defaultCover from 'images/default-profile.jpg';

const GroupSideBarContainer = styled.div`
  flex: 1;
  width: inherit;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 5px 5px 5px;
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
    margin: 10px 5px 10px 15px;
  }

  input {
    flex: 1;
    outline: none;
    background: none;
    border: none;
    font-size: 1rem;

    &::placeholder {
      font-size: 1rem;
    }
  }
`;

const GroupList = styled.div`
  flex: 1;
  margin: 0 50px 30px 50px;
  display: flex;
  flex-direction: column;
`;

const GroupItem = styled.a`
  display: flex;
  text-decoration: none;
  color: black;
  margin: 0 0 20px 0;

  img {
    width: 50px;
    height: 50px;
    margin: 0 20px 0 0;
    border-radius: 10px;
  }
`;

const GroupSideBar: React.FC = () => {
  return (
    <GroupSideBarContainer>
      <SearchBarWrap>
        <img src={iconSearch} alt="Search 아이콘" />
        <input type="text" placeholder="search group" />
      </SearchBarWrap>
      <GroupList>
        <GroupItem href="/group">
          <img src={defaultCover} alt="cover 아이콘" />
          <p>그룹 이름</p>
        </GroupItem>
        <GroupItem href="/group">
          <img src={defaultCover} alt="cover 아이콘" />
          <p>그룹 이름</p>
        </GroupItem>
      </GroupList>
    </GroupSideBarContainer>
  );
};

export default GroupSideBar;
