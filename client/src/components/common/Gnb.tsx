import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as GnbHome } from '../../images/gnb-home.svg';
import { ReactComponent as GnbGroup } from '../../images/gnb-group.svg';
import { ReactComponent as GnbHomeActive } from '../../images/gnb-home-active.svg';
import { ReactComponent as GnbGroupActive } from '../../images/gnb-group-active.svg';
import gnbMyPage from '../../images/gnb-mypage.svg';
import gnbMessage from '../../images/gnb-message.svg';
import gnbAlarm from '../../images/gnb-alarm.svg';
import gnbSelector from '../../images/gnb-down-arrow.svg';
import { UserSearchBar, UserSearchModal } from '..';
import { atom } from 'recoil';

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
  z-index: 1;
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
        {/* <UserSearchBar /> */}
        <UserSearchModal />
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
