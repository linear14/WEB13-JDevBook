import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import fetchApi from '../api/fetch';
import { userData, usersocket } from '../recoil/modal';
import { RouteComponentProps } from 'react-router-dom';

const AuthorityPage = ({ history }: RouteComponentProps) => {
  const [userdata, setUserdata] = useRecoilState(userData);
  const socket = useRecoilValue(usersocket);
  useEffect(() => {
    (async () => {
      if (userdata.login) {
        history.push('/home'); // login 페이지로도 못가게...
        return;
      }
      const { name, error } = await fetchApi.getusername();
      if (error) {
        alert('비정상 접근');
        window.location.href = '/';
      } else {
        setUserdata({ username: name, login: true });
        socket.emit('name', name);
        history.push('/home');
      }
    })();
  }, []);

  return <></>;
};

export default AuthorityPage;
