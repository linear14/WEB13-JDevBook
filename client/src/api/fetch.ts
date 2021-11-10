import { HomePost } from 'utils/types';

const fetchApi = {
  getLoginlink: async (): Promise<string> => {
    const loginLinkRes: Response = await fetch('/oauth/login');
    return await loginLinkRes.json();
  },
  getuserData: async () => {
    // { data, error }
    const userDataRes: Response = await fetch('/api/data');
    return await userDataRes.json();
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
    const usersRes: Response = await fetch(`/api/users?keyword=${keyword}`);
    return await usersRes.json();
  },

  getAllUsers: async () => {
    const allusersRes: Response = await fetch('/api/allUsers');
    return await allusersRes.json();
  },
  getPosts: async (): Promise<HomePost[]> => {
    const postsRes: Response = await fetch('/api/posts');
    return await postsRes.json();
  }
};

export default fetchApi;
