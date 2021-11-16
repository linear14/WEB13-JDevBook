import { Op } from 'sequelize';
import db from '../../models';

const getProblems = async (groupindices: number[]) => {
  const problems = await db.models.Problem.findAll({
    order: [['idx', 'DESC']],
    where: { groupidx: { [Op.in]: groupindices } },
    logging: false
  });
  return problems;
};

export { getProblems };
