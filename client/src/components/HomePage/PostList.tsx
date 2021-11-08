import { postMock } from 'mock';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { HomePost } from 'utils/types';
import Post from './Post';

const PostListContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  box-sizing: border-box;
  margin: 100px auto;
`;

const PostList = () => {
  const [posts, setPosts] = useState<HomePost[]>([]);

  const fetchInitPosts = async () => {
    return new Promise<HomePost[]>((res) => {
      setTimeout(() => {
        res(postMock);
      }, 1000);
    });
  };

  useEffect(() => {
    async function getPosts() {
      const posts = await fetchInitPosts();
      setPosts(posts);
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
