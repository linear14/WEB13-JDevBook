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
      // if (userdata.login) {
      //   history.push('/home'); // 왜 back이 없지. login 페이지로도 못가게...
      //   return;
      // }
      const { data, error } = await fetchApi.getuserData();
      if (error) {
        alert('비정상 접근');
        window.location.href = '/';
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
        socket.emit('name', data.nickname);
        //window.location.href = '/home';
      }
    })();
  }, []);

  return <></>;
};

export default Authority;
