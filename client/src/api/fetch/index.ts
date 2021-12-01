import { CommentData } from 'types/comment';
import { IProfile } from 'types/user';

import { getLoginlink, isLogin } from 'api/fetch/login';
import { logout } from 'api/fetch/logout';
import { getuserData, searchUsers, getAllUsers } from 'api/fetch/users';
import { getPosts, addPosts, updatePosts, deletePosts } from 'api/fetch/posts';

const fetchApi = {
  getLoginlink,
  isLogin,

  logout,

  getuserData,
  searchUsers,
  getAllUsers,

  getPosts,
  addPosts,
  updatePosts,
  deletePosts,

  addLikePost: async (userIdx: number, postIdx: number) => {
    const response = await fetch(`/api/likes/${userIdx}/${postIdx}`, {
      method: 'POST'
    });
    return await response.json();
  },

  updateLikeNum: async (postIdx: number, likeNum: number) => {
    const response = await fetch(`/api/posts/like/${postIdx}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likeNum: likeNum })
    });
    return await response.json();
  },

  uploadImg: async (imglist: FileList) => {
    const formData = new FormData();
    formData.append('imgfile', imglist[0]);

    const fileRes = await fetch('/api/uploadimg', {
      method: 'POST',
      body: formData
    });

    return await fileRes.json(); // {file: s3file, save: true/false}
  },

  getComments: async (postidx: number) => {
    const response = await fetch(`/api/comments/${postidx}`);
    const getCommentsList = await response.json();
    // 여기서 getCommentsList map해서 보내준다.
    return getCommentsList;
  },

  getCommentsNum: async (postidx: number) => {
    const response = await fetch(`/api/comments/${postidx}`);
    const getCommentsList = await response.json();
    return getCommentsList.length;
  },

  addComments: async (addComment: CommentData) => {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addComment)
    });

    return await response.json();
  },

  getProblems: async (groupIdx?: number | null, signal?: AbortSignal) => {
    const response = groupIdx
      ? await fetch(`/api/problems/${groupIdx}`, { signal })
      : await fetch(`/api/problems`, { signal });
    const problems = await response.json();
    return problems;
  },

  insertSolvedProblem: async (problemIdx: number) => {
    const response = await fetch(`/api/problems/correct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ problemIdx })
    });
    return await response.json();
  },

  getSolvedProblems: async (userName: string) => {
    const response = await fetch(`/api/problems/solved/${userName}`);
    return await response.json();
  },

  getJoinedProblems: async (userIdx: number) => {
    const response = await fetch(`/api/problems/joined/${userIdx}`);
    return await response.json();
  },

  getGroupList: async () => {
    const response = await fetch('/api/groups');
    return await response.json();
  },

  getGroup: async (groupIdx: number) => {
    const response = await fetch(`/api/groups/${groupIdx}`);
    return await response.json();
  },

  getJoinedGroups: async (userIdx: number) => {
    const response = await fetch(`/api/groups/joined/${userIdx}`);
    return await response.json();
  },

  joinGroup: async (userIdx: number, groupIdx: number) => {
    const response = await fetch(`/api/joingroup/${userIdx}/${groupIdx}`, {
      method: 'POST'
    });
    return await response.json();
  },

  getUserNumInGroup: async (groupIdx: number) => {
    const response = await fetch(`/api/groups/usernum/${groupIdx}`);
    return await response.json();
  },

  getProfile: async (userName: string) => {
    const response = await fetch(`/api/profile/${userName}`);
    return await response.json();
  },

  updateProfile: async (userUpdateData: IProfile) => {
    const response = await fetch(`/api/profile/${userUpdateData.idx}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userUpdateData)
    });
    return await response.json();
  }
};

export default fetchApi;
