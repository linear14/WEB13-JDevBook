import db from '../../models';

const getGroupList = async function () {
  const groupList = await db.models.Group.findAll({
    logging: false
  });

  return groupList;
};

export { getGroupList };
