import React from 'react';
import styled from 'styled-components';

const ChatSideBarContainer = styled.div`
  width: inherit;
  height: inherit;
  background: yellow;
`;

const ChatSideBar: React.FC = () => {
  return <ChatSideBarContainer />;
};

export default ChatSideBar;
