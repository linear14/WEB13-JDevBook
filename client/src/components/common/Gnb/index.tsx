import React, { Dispatch, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';

import {
  modalStateStore,
  rightModalStates,
  solvedProblemState,
  userDataStates,
  GroupNavState,
  alarmState,
  usersocketStates,
  themeState,
  commonState,
  currentPageStates
} from 'recoil/store';
import fetchApi from 'api/fetch';
import { FlexProps, TabProps, RightModalProps } from 'types/GNB';
import {
  GnbHome,
  GnbGroup,
  GnbHomeActive,
  GnbGroupActive,
  GnbMessage,
  GnbMessageActive,
  GnbAlarm,
  GnbAlarmActive,
  GnbLogout
} from 'images/icons';
import { mainLogo } from 'images';
import useResetProfile from 'hooks/useResetProfile';

import { ProfilePhoto } from 'components/common';
import UserSearchModal from './UserSearchModal';
import UserSearchBar from './UserSearchBar';
import { Page } from 'types/common';

const MainLogo = styled(Link)`
  width: 40px;
  height: 40px;
  display: block;
  background-image: url(${mainLogo});
  background-size: 40px 40px;
`;

const GnbContainer = styled.div<{ commonState: boolean }>`
  width: 100%;
  min-width: 720px;
  height: 56px;
  position: fixed;
  top: 0;
  z-index: 2;
  display: ${(props) => (props.commonState ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.15) 3px 3px 3px;
  background-color: ${(props) => props.theme.white};

  a {
    text-decoration: none;
  }
`;

const FlexWrap = styled.div<FlexProps>`
  display: flex;
  align-items: center;

  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ center }) =>
    center &&
    css`
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      @media screen and (max-width: 852px) {
        margin-left: 20px;
      }
    `}
`;

const GnbTab = styled.div<TabProps>`
  width: 112px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color border-radius 0.1s ease-in;

  &:hover {
    background-color: ${(props) => props.theme.lightgray};
    border-radius: 8px;
  }

  &:active {
    background-color: ${(props) => props.theme.gray};
  }

  svg path {
    ${({ current }) =>
      current
        ? css`
            fill: ${(props) => props.theme.green};
          `
        : css`
            fill: ${(props) => props.theme.darkgray};
          `}
  }

  @media screen and (max-width: 920px) {
    width: 60px;
    height: 48px;
  }
`;

const ProfileWrap = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: 4px;
  padding-right: 12px;

  &:hover {
    background-color: ${(props) => props.theme.lightgray};
    border-radius: 24px;
  }

  &:active {
    background-color: ${(props) => props.theme.gray};
  }

  p {
    color: ${(props) => props.theme.black};
    margin-left: 8px;
    font-size: 1rem;
    font-weight: bold;
  }

  @media screen and (max-width: 920px) {
    padding: 0px;
    p {
      display: none;
      margin-left: 0px;
    }
    img {
      width: 36px;
      height: 36px;

      &:hover {
        filter: brightness(90%);
      }

      &:active {
        filter: brightness(80%);
      }
    }
  }
`;

const IconWrap = styled.div<TabProps>`
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.lightgray};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.lightgreen};
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  svg path {
    ${({ current }) =>
      current
        ? css`
            fill: ${(props) => props.theme.green};
          `
        : css`
            fill: ${(props) => props.theme.black};
          `}
  }

  ${({ current }) =>
    current
      ? css`
          background-color: ${(props) => props.theme.lightestgreen};
        `
      : css`
          background-color: ${(props) => props.theme.lightgray};
        `}
`;

const AlarmBadge = styled.div`
  position: absolute;
  top: 13px;
  right: 71px;

  width: 12px;
  line-height: 12px;
  border-radius: 100%;
  text-align: center;

  cursor: pointer;
  background-color: ${(props) => props.theme.alert};
  color: white;
  font-size: 8px;
`;

const ToggleBtnWrap = styled.div`
  width: 50px;
  height: 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const ToggleBar = styled.div`
  position: relative;
  width: 80%;
  height: 30%;

  border-radius: 20px;
  background-color: ${(props) => props.theme.gray};
`;

const turnDark = keyframes`
  0%{
    left: -2px;
  }
  100%{
    left: 22px;
    background-color: #8a8c91;
  }
`;
const turnLight = keyframes`
  0%{
    left: 22px;
  }
  100%{
    left: -2px;
    background-color: #87d474;
  }
`;

const ToggleBtn = styled.div<{ themeState: string }>`
  position: absolute;
  top: -6px;
  left: ${(props) => (props.themeState === 'dark' ? '22px' : '-2px')};
  width: 20px;
  height: 20px;

  border-radius: 50%;
  background-color: ${(props) =>
    props.themeState === 'dark' ? props.theme.darkgray : props.theme.green};
  animation: ${(props) =>
    props.themeState === 'dark'
      ? css`
          ${turnDark} ease 0.5s
        `
      : css`
          ${turnLight} ease 0.5s
        `};
`;

const Gnb = ({ type }: { type?: string }) => {
  const modalState = useRecoilValue(modalStateStore);
  const [userdata, setUserdata] = useRecoilState(userDataStates);
  const resetSolvedProblemState = useResetRecoilState(solvedProblemState);
  const [rightModalState, setRightModalState] =
    useRecoilState(rightModalStates);
  const [groupNavState, setGroupNavState] = useRecoilState(GroupNavState);
  const [alarmNum, setAlarmNum] = useRecoilState(alarmState);
  const [theme, setTheme] = useRecoilState(themeState);
  const socket = useRecoilValue(usersocketStates);
  const [commonDisplay, setCommonDispaly] = useRecoilState(commonState);
  const history = useHistory();
  const resetProfile = useResetProfile();
  const currentPage = useRecoilValue(currentPageStates);

  const photoClickHandler = (e: React.MouseEvent) => {
    resetProfile(userdata.name);
  };

  const themeToggleHandler = (e: React.MouseEvent) => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {}, [alarmNum]);

  socket.off('get alarm');
  socket.on(
    'get alarm',
    (data: { sender: string; receiver: string; type: string }) => {
      if (data.receiver === userdata.name && data.sender !== userdata.name)
        setAlarmNum(alarmNum + 1);
    }
  );

  return (
    <GnbContainer commonState={commonDisplay} className="no-drag">
      <FlexWrap>
        <MainLogo to="/home" />
        <UserSearchBar />
        {modalState.searchUser && <UserSearchModal />}
      </FlexWrap>
      <FlexWrap center>
        <Link to="/home">
          <GnbTab current={currentPage === Page.HOME}>
            {currentPage === Page.HOME ? <GnbHomeActive /> : <GnbHome />}
          </GnbTab>
        </Link>
        <Link to="/groupselect">
          <GnbTab current={currentPage === Page.GROUP_SELECT}>
            {currentPage === Page.GROUP_SELECT ? (
              <GnbGroupActive />
            ) : (
              <GnbGroup />
            )}
          </GnbTab>
        </Link>
      </FlexWrap>
      <FlexWrap>
        <ToggleBtnWrap onClick={themeToggleHandler}>
          <ToggleBar>
            <ToggleBtn themeState={theme} />
          </ToggleBar>
        </ToggleBtnWrap>
        <Link to={`/profile/${userdata.name}`} onClick={photoClickHandler}>
          <ProfileWrap>
            <ProfilePhoto userName={userdata.name} size="28px" />
            <p>{userdata.name}</p>
          </ProfileWrap>
        </Link>
        <IconWrap
          current={rightModalState.messageFlag === true}
          onClick={() => {
            ChangeFlag(rightModalState, setRightModalState, 'messageFlag');
            setGroupNavState({
              ...groupNavState,
              groupChat: false
            });
          }}
        >
          {type === 'message' ? <GnbMessageActive /> : <GnbMessage />}
        </IconWrap>
        <IconWrap
          current={rightModalState.alarmFlag === true}
          onClick={() => {
            ChangeFlag(rightModalState, setRightModalState, 'alarmFlag');
            setAlarmNum(0);
            socket.emit('make alarms check', { receiver: userdata.name });
          }}
        >
          {type === 'alarm' ? <GnbAlarmActive /> : <GnbAlarm />}
        </IconWrap>
        <AlarmBadge
          onClick={() => {
            ChangeFlag(rightModalState, setRightModalState, 'alarmFlag');
            setAlarmNum(0);
            socket.emit('make alarms check', { receiver: userdata.name });
          }}
        >
          {alarmNum ? alarmNum : null}
        </AlarmBadge>
        <IconWrap
          onClick={async () => {
            ChangeFlag(rightModalState, setRightModalState, '');
            await fetchApi.logout();
            setUserdata({
              idx: -1,
              name: '',
              profile: '' as string,
              cover: '' as string,
              bio: '' as string,
              login: false
            });
            setCommonDispaly(false);
            resetSolvedProblemState();
            socket.emit('disconnect notify');
            history.push('/');
          }}
        >
          {<GnbLogout />}
        </IconWrap>
      </FlexWrap>
    </GnbContainer>
  );
};

function ChangeFlag(
  rightModalState: RightModalProps,
  setRightModalState: Dispatch<RightModalProps>,
  e: string
): void {
  if (!rightModalState.rightModalFlag || !rightModalState[e]) {
    setRightModalState({
      rightModalFlag: true,
      messageFlag: false,
      alarmFlag: false,
      selectorFlag: false,
      [e]: true
    });
  } else {
    setRightModalState({
      ...rightModalState,
      rightModalFlag: false,
      [e]: false
    });
  }
}

export default Gnb;
