import React from 'react';
import styled from 'styled-components';

const ChatSideBarContainer = styled.div<any>`
  width: inherit;
  height: inherit;
  ${(props) => `background: ${setColor(props.flagObj.flagObj)}`}
`;

function setColor(props: any) {
  if (props.rightModalFlag) {
    if (props.myPageFlag) {
      return `red`;
    } else if (props.messageFlag) {
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

const ChatSideBar: React.FC<any> = (flagObj) => {
  return <ChatSideBarContainer flagObj={flagObj} />;
};

export default ChatSideBar;
