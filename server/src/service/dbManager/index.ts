import db from '../../models';

import { toggleLikePosts, updateLikeNum } from './like';
import { getPosts, addPost, updatePost, deletePost } from './post';
import { getComments, getCommentsNum, addComment } from './comment';
import {
  getUserData,
  getAllUsers,
  getUseridx,
  getUserName,
  setUserLoginState,
  getUserLoginState,
  getUserJoinedGroups,
  getAllUsersObj,
  updateBio,
  updateProfile,
  getProfile
} from './user';
import { searchUsers } from './search';
import { getProblems, insertSolvedProblem } from './problem';
import { getGroupList, getGroup, toggleUserGroup } from './group';
import { setChatList, getChatList } from './chat';
import { setGroupChatList, getGroupChatList } from './groupchat';
import { getGroupUsers, getGroupUsersName } from './usergroup';
import { addAlarm } from './alarm';

const dbManager = {
  sync: async () => {
    await db
      .sync({ force: false, logging: false })
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
      });
  },

  getUserData,
  getAllUsers,
  getUserName,
  getUseridx,

  updateProfile,
  getProfile,
  updateBio,

  setUserLoginState,
  getUserLoginState,

  searchUsers,

  getPosts,
  addPost,
  updatePost,
  deletePost,

  setChatList,
  getChatList,

  toggleLikePosts,
  updateLikeNum,

  addComment,
  getComments,
  getCommentsNum,

  getProblems,
  insertSolvedProblem,

  getGroupList,
  getGroup,
  getUserJoinedGroups,
  toggleUserGroup,

  getGroupUsers,
  getGroupUsersName,

  setGroupChatList,
  getGroupChatList,
  getAllUsersObj,

  addAlarm
};

export default dbManager;
