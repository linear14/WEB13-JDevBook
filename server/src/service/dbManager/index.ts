import db from '../../models';

import { toggleLikePosts, updateLikeNum } from './like';
import { getPosts, addPost, updatePost, deletePost } from './post';
import { getComments, addComment } from './comment';
import {
  getUserData,
  getAllUsers,
  getUseridx,
  getUserName,
  setUserLoginState,
  getUserLoginState,
  getUserJoinedGroups
} from './user';
import { searchUsers } from './search';
import { getProblems, insertSolvedProblem } from './problem';
import { getGroupList, getGroup } from './group';
import { CommentData } from '../../types/interface';
import { setChatList, getChatList } from './chat';

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

  getProblems,
  insertSolvedProblem,

  getGroupList,
  getGroup,
  getUserJoinedGroups
};

export default dbManager;
