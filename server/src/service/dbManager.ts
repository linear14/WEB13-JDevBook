import sequelize from 'sequelize';
import { Op, fn, col } from 'sequelize';
import db from '../models';

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
      where: { nickname: username },
      defaults: { nickname: username }
    });

    return user.get();
  },

  searchUsers: async (keyword: string) => {
    const users = await db.models.User.findAll({
      where: { nickname: { [Op.like]: `%${keyword}%` } }
    });

    return users;
  },

  getPosts: async () => {
    const postsWithUser = await db.models.Post.findAll({
      include: [{ model: db.models.User, as: 'BTUseruseridx' }],
      order: [['createdAt', 'DESC']]
    });

    return postsWithUser;
  },

  getAllUsers: async () => {
    const users = await db.models.User.findAll({});
    return users;
  },

  getUseridx: async function (name: string) {
    const user = await db.models.User.findOne({
      where: { nickname: name }
    });

    return user?.get().idx ? user?.get().idx : -1;
  },

  getChatList: async function (sender: string, receiver: string) {
    const senderidx: number = await this.getUseridx(sender);
    const receiveridx: number = await this.getUseridx(receiver);

    const all = await db.models.Chat.findAll({
      where: {
        [Op.or]: [
          { senderidx: senderidx, receiveridx: receiveridx },
          { receiveridx: senderidx, senderidx: receiveridx }
        ]
      }
    });
    const all_map = all.map((data: any) => data.get());

    //console.log(all_map); // 없거나 오류여도 []나옴 ㅎ

    // mysql 시간 한국시간으로 좀 바꾸자

    /*
      { senderdix: ?
        receiveridx: ?
        chat: ?}, 
        줄줄히
    */

    return {
      senderidx: senderidx,
      receiveridx: receiveridx,
      previousMsg: all_map
    };
  },

  setChatList: async function (sender: string, receiver: string, msg: string) {
    const senderidx: number = await this.getUseridx(sender);
    const receiveridx: number = await this.getUseridx(receiver);
    await db.models.Chat.create({
      senderidx: senderidx,
      receiveridx: receiveridx,
      content: msg
    });
  }
};

// fn('COUNT', col('Comments.idx'))

export default dbManager;
