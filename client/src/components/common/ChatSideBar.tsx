import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';

import { RightModalProps, Message } from 'utils/types';
import { useRecoilValue, useRecoilState } from 'recoil';
import { rightModalStates, userData, usersocket, chatWith } from 'recoil/store';
import CurrentUser from './CurrentUser';

const ChatSideBarContainer = styled.div<any>`
  width: inherit;
  height: inherit;
  box-shadow: -5px 2px 5px 0px rgb(0 0 0 / 24%);
`;

const ChatSideBar = () => {
  const rightModalState = useRecoilValue(rightModalStates);
  const socket = useRecoilValue(usersocket);
  const [messageList, setMessageList] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const userdata = useRecoilValue(userData);
  // 테스트용. 나중에 클릭해서 상대방 이름 알도록 해야함

  const [chatReceiver, setChatWith] = useRecoilState(chatWith);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // sernder, receiver, message 보내고
    // 서버에서 채팅 저장하고, 기존 메세지만 추가로 다시 받아
    socket.emit('send message', {
      sender: userdata.name,
      receiver: chatReceiver,
      message: value
    });
  };
  useEffect(() => {
    // 지금은 이름인데 idx로 해줘!!!!!!!!!!!!!!!!!!!!!!! 그래야 DB에서 편해져
    // 처음에 이름 서버소켓에 등록해둬
    // 위에서 메세지 보낼때 내이름, 상대방이름(아이디), 채팅 보내
    // 서버에서 'send message'에서 자기 이름이 위 2개 이름중에 포함되면 진행
    // 뭘 진행? 채팅 보낸거 DB에 저장. 그리고 emit('receive message')로 아래 진행
  }, [userdata]);

  useEffect(() => {
    setMessageList([]);
    // DB에서 받아온 데이터로 바꿔줘야함
    socket.on('receive message', (data: any) => {
      const { sender, receiver, msg } = data;
      if (sender === userdata.name) {
        setMessageList((messageList: any) => messageList.concat(msg)); // 도저히 모르겠음
      } else if (receiver === userdata.name && sender === chatReceiver)
        setMessageList((messageList: any) => messageList.concat(msg)); // 도저히 모르겠음

      document
        .querySelector('.chat-list')
        ?.scrollBy({ top: 100, behavior: 'smooth' });
    });
  }, [chatReceiver]);

  const chatList = messageList.map(
    (
      msg,
      idx // 도대체 뭐지
    ) => (
      <MessageWrap
        key={idx}
        name={msg.split(':')[0]}
        sender={userdata.name}
      >
        <MessageText name={msg.split(':')[0]} sender={userdata.name}>
          {msg}
        </MessageText>
      </MessageWrap>
    )
  );

  if (rightModalState.rightModalFlag && rightModalState.messageFlag) {
    return (
      <ChatSideBarContainer flagObj={rightModalState}>
        <div>
          <CurrentUser />
          <hr />
          <ChatTitle>{chatReceiver} 와의 채팅</ChatTitle>
          <ChatList className="chat-list">{chatList}</ChatList>
          <form
            className="chat-form"
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              if (value) {
                submit(e);
                setValue('');
              } else {
                e.preventDefault();
              }
            }}
          >
            <ChatInputWrapper>
              <ChatInput
                type="text"
                autoComplete="off"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.value)
                }
                value={value}
                placeholder="Aa"
              />
            </ChatInputWrapper>
            {/* <button type="submit">입력하기</button> */}
          </form>
        </div>
      </ChatSideBarContainer>
    );
  } else return null;
};

const ChatTitle = styled.div`
  color: gray;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
`;

const MessageWrap = styled.div<any>`
  width: inherit;
  // border: 1px solid red;
  ${(props) =>
    `text-align: ${props.name === props.sender ? 'right;' : 'left;'}`}
`;

const MessageText = styled.div<any>`
  ${(props) =>
    `background: ${props.name === props.sender ? '#84D474;' : '#e4e6eb;'}`}
  ${(props) => `color: ${props.name === props.sender ? 'white;' : 'black;'}`}
  word-break: break-word;
  border-radius: 10px;
  margin-top: 5px;
  height: auto;
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
`;

const ChatList = styled.section<any>`
  height: 277px;
  overflow-x: hidden;
  overflow-y: scroll;
  bottom: 0;
  width: 300px;
  margin-right: 20px;
  margin-left: 20px;
  text-align: right;
  margin-bottom: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatInputWrapper = styled.div`
  align-items: center;
  text-align: center;
`;

const ChatInput = styled.input`
  border-radius: 15px;
  border: none;
  background-color: rgb(240, 242, 245);
  padding-left: 8px;
  height: 30px;
`;

export default ChatSideBar;
