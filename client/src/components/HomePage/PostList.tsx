import getData from 'api/fetch';
import { mockPost } from 'mock/post';
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

  const fetchPosts = async (start: number = 0, count: number = 10) => {
    setPosts(mockPost);
    // const result = await getData.getPosts();
    // setPosts(result);
  };

  useEffect(() => {
    setTimeout(async () => {
      fetchPosts();
    }, 1000);
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
