import React from 'react';
import styled from 'styled-components';

const ChatSideBarContainer = styled.div<any>`
  width: inherit;
  height: inherit;
  ${(props) => props.rightModalFlag ? `background: #add8e6` : `background: white` }
`;

const ChatSideBar: React.FC<any> = ({rightModalFlag}) => {
  return <ChatSideBarContainer rightModalFlag={rightModalFlag}/>;
};

export default ChatSideBar;
