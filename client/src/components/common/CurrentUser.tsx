import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { useRecoilValue, useRecoilState } from 'recoil';
import { usersocketStates, userDataStates, chatWith } from 'recoil/store';

import getData from 'api/fetch';
import { defaultProfile } from 'images';
import ProfilePhoto from 'components/common/ProfilePhoto';
import palette from 'theme/palette';
import style from 'theme/style';

const ClickableProfileImage = styled(ProfilePhoto)``;

const CurrentUserWrapper = styled.div`
  width: inherit;
  height: 300px;

  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;

    margin-left: ${style.margin.small};
    margin-right: ${style.margin.small};
  }
`;

const CurrentUserBox = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    border-radius: 10px;
    background: ${palette.lightgray};
  }
`;

// 프리티어 적용되면 css palette 부분 인식 못해서 로그인 여부 색깔 안보임!
const LoginState = styled.div<{ usersLoginState: string[]; user: string }>`
  width: 8px;
  height: 8px;
  border-radius: 100%;  
  ${(props) =>
    `background-color: ${
      props.usersLoginState.includes(props.user)
        ? css`${palette.green}`
        : css`${palette.darkgray}`
    };`}
  margin-right: ${style.margin.small};
`;

const CurrentUser = () => {
  const socket = useRecoilValue(usersocketStates);
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [chatReceiver, setChatWith] = useRecoilState(chatWith);
  const currentUserName = useRecoilValue(userDataStates).name;
  const [usersLoginState, setUsersLoginState] = useState<string[]>([]);

  useEffect(() => {
    const fetchJob = setTimeout(async () => {
      const users = await getData.getAllUsers();
      const usersInfo = users.map(
        (user: { idx: number; nickname: string }) => user.nickname
      );
      setAllUsers(usersInfo);
      // 새로운 유저는 소켓으로 받아오도록

      return () => clearTimeout(fetchJob);
    }, 0);
  }, []);

  useEffect(() => {
    if (currentUserName) {
      socket.emit('login notify', currentUserName);
      socket.off('receive users login state');
      socket.on('receive users login state', (userArray: string[]) => {
        setUsersLoginState(userArray);
      });
    }
  }, [currentUserName, usersLoginState]);

  const UserList = allUsers.map((user: string, idx: number) => (
    <CurrentUserBox
      key={idx}
      className="User"
      onClick={() => setChatWith(user)}
    >
      <ClickableProfileImage size={'30px'} />
      <LoginState usersLoginState={usersLoginState} user={user} />
      {user}
    </CurrentUserBox>
  ));

  return <CurrentUserWrapper>{UserList}</CurrentUserWrapper>;
};

export default CurrentUser;
