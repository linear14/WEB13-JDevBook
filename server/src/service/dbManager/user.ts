import db from '../../models';
import './index';

const getAllUsers = async () => {
    const users = await db.models.User.findAll({ logging: false });
    return users;
  }

const getUserName = async function (idx: number) {
    const username = await db.models.User.findOne({
      where: { idx: idx },
      logging: false
    });
    return username?.get().nickname;
  }

const getUseridx = async function (name: string) {
    const user = await db.models.User.findOne({
      where: { nickname: name },
      logging: false
    });

    return user?.get().idx ? user?.get().idx : -1;
  }

  export { getAllUsers, getUserName, getUseridx };