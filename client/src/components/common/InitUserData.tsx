import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import fetchApi from 'api/fetch';
import { userData, usersocket } from 'recoil/store';
import { RouteComponentProps } from 'react-router-dom';

const InitUserData = (/*{ history }: RouteComponentProps*/) => {
  const [userdata, setUserdata] = useRecoilState(userData);
  const [socket, setSocket] = useRecoilState(usersocket);
  useEffect(() => {
    (async () => {
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
        socket.emit('name', data.nickname);
      }
    })();
  }, []);

  return <></>;
};

export default InitUserData;
