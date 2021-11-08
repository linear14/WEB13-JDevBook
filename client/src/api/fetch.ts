import socket from 'components/common/Socket';

const getData = {
  getusername: () => {
    return fetch('/api/data').then((res) => res.json());
  },
  logout: () => {
    fetch('/oauth/logout')
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        socket.disconnect(); // 제거할 데이터 있으면 제거
        window.location.href = '/';
      });
  },
  searchUsers: async (keyword: string) => {
    const response = await fetch(`/api/users?keyword=${keyword}`);
    return await response.json();
  }
};

export default getData;
