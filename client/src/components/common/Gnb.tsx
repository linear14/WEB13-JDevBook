import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import mainLogo from '../../images/main-logo.png';
import { ReactComponent as GnbHome } from '../../images/gnb-home.svg';
import { ReactComponent as GnbGroup } from '../../images/gnb-group.svg';
import { ReactComponent as GnbHomeActive } from '../../images/gnb-home-active.svg';
import { ReactComponent as GnbGroupActive } from '../../images/gnb-group-active.svg';
import gnbMyPage from '../../images/gnb-mypage.svg';
import gnbMessage from '../../images/gnb-message.svg';
import gnbAlarm from '../../images/gnb-alarm.svg';
import gnbSelector from '../../images/gnb-down-arrow.svg';
import iconSearch from '../../images/icon-search.svg';

type GnbProps = {
  type?: string;
};

type FlexProps = {
  center?: boolean;
};

type TabProps = {
  current?: boolean;
};

type IconProps = {
  img: any;
};

const GnbContainer = styled.div`
  width: 100%;
  height: 56px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  img {
    width: 36px;
    height: 36px;
  }
`;

const FlexWrap = styled.div<FlexProps>`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    vertical-align: bottom;
  }

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
    `}
`;

const UserSearchBar = styled.div`
  width: 240px;
  height: 40px;
  background: #f0f2f5;
  border-radius: 24px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;

  img {
    width: 24px;
    height: 24px;
  }

  input {
    flex: 1;
    outline: none;
    background: none;
    border: none;
    margin-left: 4px;
    font-size: 1rem;

    &::placeholder {
      font-size: 1rem;
    }
  }
`;

const GnbTab = styled.div<TabProps>`
  width: 112px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s ease-in;

  &:hover {
    background: #f2f2f2;
    border-radius: 8px;
  }

  svg path {
    ${({ current }) =>
      current &&
      css`
        fill: #87d474;
      `}
  }
`;

const IconWrap = styled.div<IconProps>`
  width: 40px;
  height: 40px;
  background: #e4e6eb;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    content: '';
    background-image: url(${({ img }) => img});
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #d8dadf;
  }
`;

const Gnb: React.FC<GnbProps> = ({ type }) => {
  return (
    <GnbContainer>
      <FlexWrap>
        <Link to="/home">
          <img src={mainLogo} />
        </Link>
        <UserSearchBar>
          <img src={iconSearch} />
          <input type="text" placeholder="Search User" />
        </UserSearchBar>
      </FlexWrap>
      <FlexWrap center>
        <Link to="/home">
          <GnbTab current={type === 'home'}>
            {type === 'home' ? <GnbHomeActive /> : <GnbHome />}
          </GnbTab>
        </Link>
        <Link to="/group">
          <GnbTab current={type === 'group'}>
            {type === 'group' ? <GnbGroupActive /> : <GnbGroup />}
          </GnbTab>
        </Link>
      </FlexWrap>
      <FlexWrap>
        <Link to="/profile/1">
          <IconWrap img={gnbMyPage} />
        </Link>
        <IconWrap img={gnbMessage} />
        <IconWrap img={gnbAlarm} />
        <IconWrap img={gnbSelector} />
      </FlexWrap>
    </GnbContainer>
  );
};

export default Gnb;
