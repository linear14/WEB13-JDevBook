import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import fetchApi from 'api/fetch';
import { userData, usersocket } from 'recoil/modal';
import { RouteComponentProps } from 'react-router-dom';

const Authority = (/*{ history }: RouteComponentProps*/) => {
  const [userdata, setUserdata] = useRecoilState(userData);
  const [socket, setSocket] = useRecoilState(usersocket);
  useEffect(() => {
    (async () => {
      // if (!userdata.login) {
      //   alert('로그인되어있지 않습니다.');
      //   window.location.href = '/';
      //   return;
      // }
      const { data, error } = await fetchApi.getuserData();
      if (error) {
        alert('비정상 접근');
        window.location.href = '/';
        return;
      } else {
        setUserdata({
          name: data.nickname,
          idx: data.idx,
          profile: data.profile,
          cover: data.cover,
          bio: data.bio,
          login: true
        });
        //history.push('/home');
        // socket.disconnect(); // 가끔 새로고침 시에 2번씩 채팅쳐짐
        // socket.connect();
        socket.emit('name', data.nickname);
        //window.location.href = '/home';
      }
    })();
  }, []);

  return <></>;
};

export default Authority;
