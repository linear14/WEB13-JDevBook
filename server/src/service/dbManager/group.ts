import db from '../../models';

const getGroupList = async () => {
  const groupList = await db.models.Group.findAll({
    logging: false
  });

  return groupList;
};

const getGroup = async (groupIdx: number) => {
  const group = await db.models.Group.findOne({
    where: { idx: groupIdx },
    logging: false
  });

  return group;
};

export { getGroupList, getGroup };
