import getData from 'api/fetch';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { HomePost } from 'utils/types';
import Post from './Post';

const PostListContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 48px;
`;

const PostList = () => {
  const [posts, setPosts] = useState<HomePost[]>([]);

  useEffect(() => {
    function getPosts() {
      setTimeout(async () => {
        const posts = await getData.getPosts();
        setPosts(posts);
      }, 1000);
    }
    getPosts();
  }, []);

  return (
    <PostListContainer>
      {posts.map((post) => (
        <Post key={post.idx} post={post} />
      ))}
    </PostListContainer>
  );
};

export default PostList;
