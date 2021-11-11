import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import fetchApi from 'api/fetch';
import { userData, usersocket, postWriterData } from 'recoil/store';

const InitUserData = (/*{ history }: RouteComponentProps*/) => {
  const [userdata, setUserdata] = useRecoilState(userData);
  const [socket, setSocket] = useRecoilState(usersocket);
  const [postData, setPostData] = useRecoilState(postWriterData);

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
        setPostData({ ...postData, useridx: data.idx });
        socket.emit('name', data.nickname);
      }
    })();
  }, []);

  return <></>;
};

export default InitUserData;
