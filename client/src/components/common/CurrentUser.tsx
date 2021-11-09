import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getData from 'api/fetch';
import { useRecoilState } from 'recoil';
import { chatWith } from 'recoil/store';
// import { UserProps } from 'utils/types';

import { defaultProfile } from 'images';

interface UserProps {
  idx?: number;
  nickname?: string;
}

const CurrentUser = () => {
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [chatReceiver, setChatWith] = useRecoilState(chatWith);

  useEffect(() => {
    const fetchJob = setTimeout(async () => {
      const users = await getData.getAllUsers();
      const usersInfo = users.map((user: UserProps) => user.nickname);
      setAllUsers(usersInfo);
      // 새로운 유저는 소켓으로 받아오도록
      return () => clearTimeout(fetchJob);
    }, 0);
  }, []);

  const UserList = allUsers.map((user, idx) => (
    <CurrentUserBox
      key={idx}
      className="User"
      onClick={(): void => setChatWith(user)}
    >
      <img src={defaultProfile} />
      {user}
    </CurrentUserBox>
  ));

  return <CurrentUserWrapper>{UserList}</CurrentUserWrapper>;
};

const CurrentUserWrapper = styled.div`
  width: inherit;
  height: 320px;

  img {
    border-radius: 50%;
    width: 28px;
    height: 28px;
    margin-left: 7px;
    margin-right: 7px;
  }
`;

const CurrentUserBox = styled.div`
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  &:hover {
    background: #eeeeee;
    border-radius: 10px;
  }
`;

export default CurrentUser;
