import React from 'react';
import styled, { css } from 'styled-components';

import palette from 'theme/palette';
import style from 'theme/style';

const GroupNavigationWrap = styled.div`
  padding-left: ${style.padding.large};

  display: flex;
`;

const NavigationBtn = styled.div<{ isActive: boolean }>`
  width: 68px;
  height: 50px;
  margin: ${style.margin.smallest} 0;

  border-radius: ${(props) => (props.isActive ? `0` : `8px`)};
  border-bottom-style: solid;
  border-bottom-color: ${(props) =>
    props.isActive ? `${palette.green}` : `${palette.white}`};
  background-color: ${palette.white};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    ${(props) =>
      props.isActive
        ? ``
        : css`
            cursor: pointer;
            filter: brightness(90%);
          `};
  }

  &:active {
    ${(props) =>
      props.isActive
        ? ``
        : css`
            filter: brightness(85%);
          `};
  }
`;

const GroupNavigation = () => {
  return (
    <GroupNavigationWrap>
      <NavigationBtn isActive={true}>소개</NavigationBtn>
      <NavigationBtn isActive={false}>문제</NavigationBtn>
      <NavigationBtn isActive={false}>토론</NavigationBtn>
    </GroupNavigationWrap>
  );
};

export default GroupNavigation;
