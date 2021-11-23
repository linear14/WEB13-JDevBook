import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { rightModalStates } from 'recoil/store';

import ProfilePhoto from 'components/common/ProfilePhoto';
import palette from 'theme/palette';
import style from 'theme/style';

const ClickableProfileImage = styled(ProfilePhoto)``;

const OpenAlarmAnimation = keyframes`
  0% { opacity: 0; transform: translateX(100px); }
  100% { opacity: 1; transform: translateX(0px); }
`;

const CloseAlarmAnimation = keyframes`
  0% { opacity: 1; transform: translateX(0px); }
  100% { opacity: 0; transform: translateX(100px); }
`;

const AlarmSideBarContainer = styled.div<{
  rightModalFlag: boolean;
  alarmFlag: boolean;
}>`
  position: fixed;
  top: 56px;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 340px;
  height: calc(100% - 56px);

  visibility: ${(props) =>
    props.rightModalFlag && props.alarmFlag ? `` : `hidden`};
  transition: ${(props) =>
    props.rightModalFlag && props.alarmFlag ? `` : `all .5s`};

  animation-name: ${(props) =>
    props.rightModalFlag && props.alarmFlag
      ? css`
          ${OpenAlarmAnimation}
        `
      : css`
          ${CloseAlarmAnimation}
        `};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;

  overscroll-behavior: none;
  background-color: ${palette.white};
  box-shadow: -5px 2px 5px 0px rgb(0 0 0 / 24%);

  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const AlarmWrapper = styled.div`

`;
const AlarmBox = styled.div`
  display:flex;
  padding: 8px 8px 8px 8px;
  :hover {
    background-color: ${palette.lightgray};
    border-radius:10px;
  }
`;
const AlarmText = styled.div`
  margin-left: 4px;
  word-break: break-word;
`;

const AlarmSideBar = () => {
  const rightModalState = useRecoilValue(rightModalStates);

  return (
    <AlarmSideBarContainer
      rightModalFlag={rightModalState.rightModalFlag}
      alarmFlag={rightModalState.alarmFlag}
    >
      <AlarmWrapper>
        <AlarmBox>
          <ClickableProfileImage userName={'idiot-kitto'} size={'60px'} />
          <AlarmText>나에게 알림이 도착했습니다.</AlarmText>
        </AlarmBox>
      </AlarmWrapper>
      <AlarmWrapper>
        <AlarmBox>
          <ClickableProfileImage userName={'idiot-kitto'} size={'60px'} />
          <AlarmText>나에게 알림이 도착했습니다.</AlarmText>
        </AlarmBox>
      </AlarmWrapper>
    </AlarmSideBarContainer>
  );
};

export default AlarmSideBar;
