const getData = {
  getusername: () => {
    return fetch('/api/data').then((res) => res.json());
  },
  logout: () => {
    fetch('/ouath/logout');
    // redirect를 oauth/logout에서 해놨는데
    // client에서 받은 후에 저장해둔 데이터들 다 제거한 이후 (저장한다면?)
    // 여기서 window.location.href 하는게 맞을듯
  },
  searchUsers: async (keyword: string) => {
    const response = await fetch(`/api/users?keyword=${keyword}`);
    return await response.json();
  }
};

export default getData;
