import { useRecoilState } from 'recoil';
import { usersocket } from 'recoil/modal';
import { Socket } from 'socket.io-client';

const getData = {
  getusername: () => {
    return fetch('/api/data').then((res) => res.json());
  },
  logout: () => {
    fetch('/oauth/logout')
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        // 제거할 데이터 있으면 제거
        // recoil 데이터들 다 제거해야 하지 않나
        window.location.href = '/'; // href쓰면 소켓 disconnect 알아서 된다.
      });
  },
  searchUsers: async (keyword: string) => {
    const response = await fetch(`/api/users?keyword=${keyword}`);
    return await response.json();
  }
};

export default getData;
