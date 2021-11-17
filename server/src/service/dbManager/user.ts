import db from '../../models';

const getUserData = async (username: string) => {
    const [user, created] = await db.models.User.findOrCreate({
      include: db.models.Problem,
      where: { nickname: username },
      defaults: { nickname: username },
      logging: false
    });

    return user.get();
  }

const getAllUsers = async () => {
  const users = await db.models.User.findAll({ logging: false });
  return users;
};

const getUserName = async function (idx: number) {
  const username = await db.models.User.findOne({
    where: { idx: idx },
    logging: false
  });
  return username?.get().nickname;
};

const getUseridx = async function (name: string) {
  const user = await db.models.User.findOne({
    where: { nickname: name },
    logging: false
  });

  return user?.get().idx ? user?.get().idx : -1;
};

export { getUserData, getAllUsers, getUserName, getUseridx };
