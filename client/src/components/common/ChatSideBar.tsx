import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { rightModalStates } from 'recoil/modal';
import socket from './Socket';

type RightModalProps = {
  [key: string]: boolean;
  rightModalFlag: boolean;
  messageFlag: boolean;
  alarmFlag: boolean;
  selectorFlag: boolean;
};

type Message = {
  message?: string;
};

type MessageObj = {
  string: string;
};

const ChatSideBarContainer = styled.div<any>`
  width: inherit;
  height: inherit;
  ${(props) => `background: ${setColor(props.flagObj)}`}
`;

function setColor(props: RightModalProps) {
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

  const [messageList, setMessageList] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('send message', { message: value });
  };

  useEffect(() => {
    socket.on('receive message', (message: Message) => {
      setMessageList((messageList: any) => messageList.concat(message)); // 도저히 모르겠음
    });
  }, []);

  const chatList = messageList
    .map(
      (
        item: any // 도대체 뭐지
      ) => (
        <div className="message">
          <p className="message-text">{item.message}</p>
        </div>
      )
    )
    .reverse();

  console.log(chatList);

  return (
    <ChatSideBarContainer flagObj={rightModalState}>
      <div>
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
          <div className="chat-inputs">
            <input
              type="text"
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              value={value}
              placeholder="메세지입력하기"
            />
          </div>
          <button type="submit">입력하기</button>
        </form>
        <section className="chat-list">{chatList}</section>
      </div>
    </ChatSideBarContainer>
  );
};

export default ChatSideBar;
