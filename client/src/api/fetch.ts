import { HomePost, PostData } from 'utils/types';
import objectStorage from './objectStorage';

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
  logout: async () => {
    const logoutRes: Response = await fetch('/oauth/logout');
    const { message } = await logoutRes.json();
    alert(message);
  },
  searchUsers: async (keyword: string) => {
    const usersRes: Response = await fetch(`/api/users?keyword=${keyword}`);
    return await usersRes.json();
  },

  getAllUsers: async () => {
    const allusersRes: Response = await fetch('/api/allUsers');
    return await allusersRes.json();
  },

  getPosts: async (lastIdx: number, count: number): Promise<HomePost[]> => {
    const response = await fetch(
      `/api/posts?lastIdx=${lastIdx}&count=${count}`
    );
    return await response.json();
  },

  addPosts: async (postData: PostData) => {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
    return await response.json();
  },

  uploadImg: async (imglist: FileList) => {
    console.log(imglist);
    console.log(imglist[0]);
    const formData = new FormData();
    formData.append('imgfile', imglist[0]);
    //await objectStorage.uploadObjectfile('canupload.png', imglist[0]);
    await fetch('/api/uploadimg', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      },
      body: formData
    });
  }
};

export default fetchApi;
