const getData = {
  getusername: () => {
    return fetch('/api/data').then((res) => res.json());
  },
  logout: () => {
    fetch('/ouath/logout')
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        //socket.disconnect();
        //저장 데이터도 다 제거
        window.location.href = '/';
      });
  },
  searchUsers: (keyword: string) => {
    return fetch(`/api/users?keyword=${keyword}`).then((res) => res.json());
  }
};

export default getData;
