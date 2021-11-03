import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { rightModalStates } from 'recoil/modal';

const ChatSideBarContainer = styled.div<any>`
  width: inherit;
  height: inherit;
  ${(props) => `background: ${setColor(props.flagObj)}`}
`;

function setColor(props: any) {
  if (props.rightModalFlag) {
    if (props.messageFlag) {
      return `yellow`;
    } else if (props.alarmFlag) {
      return `green`;
    } else if (props.selectorFlag) {
      return `blue`;
    }
  } else {
    return `white`;
  }
}

const ChatSideBar: React.FC<any> = () => {
  const rightModalState = useRecoilValue(rightModalStates);

  return <ChatSideBarContainer flagObj={rightModalState} />;
};

export default ChatSideBar;
