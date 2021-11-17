import { Op } from 'sequelize';

import db from '../../models';

import { toggleLikePosts, updateLikeNum } from './like';
import { getPosts, addPost, updatePost, deletePost } from './post';
import { getComments } from './comment';
import { getAllUsers, getUseridx, getUserName } from './user';
import { searchUsers } from './search';
import { getProblems, insertSolvedProblem } from './problem';
import { getGroupList, getGroup } from './group';
import { CommentData } from '../../types/interface';

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

  getUserdata: async (username: string) => {
    const [user, created] = await db.models.User.findOrCreate({
      include: db.models.Problem,
      where: { nickname: username },
      defaults: { nickname: username },
      logging: false
    });

    return user.get();
  },

  searchUsers,

  getPosts,
  addPost,
  updatePost,
  deletePost,

  getAllUsers,
  getUserName,
  getUseridx,

  getChatList: async function (sender: string, receiver: string) {
    const senderidx: number = await this.getUseridx(sender);
    const receiveridx: number = await this.getUseridx(receiver);

    const allChats = await db.models.Chat.findAll({
      where: {
        [Op.or]: [
          { senderidx: senderidx, receiveridx: receiveridx },
          { senderidx: receiveridx, receiveridx: senderidx }
        ]
      },
      logging: false
    });
    const allChatsArray = allChats.map((data: any) => data.get());

    return {
      senderidx: senderidx,
      receiveridx: receiveridx,
      previousMsg: allChatsArray
    };
  },

  setChatList: async function (sender: string, receiver: string, msg: string) {
    const senderidx: number = await this.getUseridx(sender);
    const receiveridx: number = await this.getUseridx(receiver);
    await db.models.Chat.create({
      senderidx: senderidx,
      receiveridx: receiveridx,
      content: msg,
      logging: false
    });
  },

  addComment: async function (addComment: CommentData) {
    const userIdx: number = await this.getUseridx(addComment.sender);
    const result = await db.models.Comment.create({
      ...addComment,
      useridx: userIdx
    });
    return result.get();
  },

  toggleLikePosts,
  updateLikeNum,

  getComments,

  getProblems,
  insertSolvedProblem,

  getGroupList,
  getGroup
};

export default dbManager;
