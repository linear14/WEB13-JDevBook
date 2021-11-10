import getData from 'api/fetch';
import React, { useEffect, useRef, useState } from 'react';
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

const Observer = styled.div`
  width: 680px;
  height: 0px;
  background: transparent;
`;

const PostList = () => {
  const [posts, setPosts] = useState<HomePost[]>([]);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<IntersectionObserver>();

  const observer = (element: HTMLDivElement) => {
    if (isFetching) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching && hasMore) {
          const lastIdx = posts[posts.length - 1].idx;
          fetchPosts(lastIdx);
        }
      },
      {
        rootMargin: '840px 0px'
      }
    );
    element && observerRef.current.observe(element);
  };

  const fetchPosts = async (lastIdx: number = -1, count: number = 10) => {
    setFetching(true);
    const result = await getData.getPosts(lastIdx, count);
    if (result.length < count) {
      setHasMore(false);
    }
    setPosts(posts.concat(result));
    setFetching(false);
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
      <Observer ref={observer} />
    </PostListContainer>
  );
};

export default PostList;
