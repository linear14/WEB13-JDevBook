import db from '../../models';
import './index';

const getComments = async function (postidx: number) {
  const prevComments = await db.models.Comment.findAll({
    include: [
      {
        model: db.models.User,
        as: 'BTUseruseridx'
      }
    ],
    where: { postidx: postidx },
    logging: false
  });
  return prevComments;
};

export { getComments };
