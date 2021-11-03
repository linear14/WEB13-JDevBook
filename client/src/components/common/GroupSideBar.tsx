import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
    font-family: 'Noto Sans KR';

    &::placeholder {
      font-size: 1rem;
    }
  }
`;

const GroupList = styled.ul`
  flex: 1;
  margin: 0 50px 30px 0;
  display: flex;
  flex-direction: column;
`;

const GroupItem = styled(Link)`
  display: flex;
  text-decoration: none;
  color: black;
  padding: 5px;
  margin: 0 0 20px 0;
  font-weight: bold;

  img {
    width: 50px;
    height: 50px;
    margin: 0 20px 0 0;
    border-radius: 10px;
  }

  &:hover {
    border-radius: 10px;
    background: #f0f2f5;
    transition: all 0.2s;
  }
`;

const tempGroup = [
  {
    groupName: '운영체제',
    imgSrc: defaultCover
  },
  {
    groupName: '자료 구조',
    imgSrc: defaultCover
  }
];

const GroupSideBar: React.FC = () => {
  return (
    <GroupSideBarContainer>
      <SearchBarWrap>
        <img src={iconSearch} alt="Search 아이콘" />
        <input type="text" placeholder="search group" />
      </SearchBarWrap>
      <GroupList>
        {tempGroup.map((gruop) => (
          <GroupItem to="/group">
            <img src={gruop.imgSrc} alt="cover 아이콘" />
            <p>{gruop.groupName}</p>
          </GroupItem>
        ))}
      </GroupList>
    </GroupSideBarContainer>
  );
};

export default GroupSideBar;
