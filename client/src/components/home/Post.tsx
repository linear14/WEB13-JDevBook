import React from 'react';
import styled, { css } from 'styled-components';

const PostContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin: 100px auto;
`;

const Header = styled.div`
  width: 100%;
  box-sizing: inherit;
  padding: 16px;
  height: 100px;
  background: red;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const Body = styled.div`
  width: 100%;
  box-sizing: inherit;
  height: 300px;
  border-top: 1px solid #888888;
  border-bottom: 1px solid #888888;
  background: yellow;
`;

const Footer = styled.div`
  width: 100%;
  box-sizing: inherit;
  padding: 16px;
  height: 100px;
  background: green;
`;

const Divider = styled.div`
  width: calc(100% - 32px);
  height: 1px;
  background: #888888;
  margin-left: 16px;
  margin-right: 16px;
`;

const ButtonsWrap = styled.div`
  width: calc(100% - 32px);
  box-sizing: inherit;
  margin: 2px 16px;
  height: 60px;
  background: blue;
`;

const Post = () => {
  return (
    <PostContainer>
      <Header />
      <Body />
      <Footer />
      <Divider />
      <ButtonsWrap />
    </PostContainer>
  );
};

export default Post;
