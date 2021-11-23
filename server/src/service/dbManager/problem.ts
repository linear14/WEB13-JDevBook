import { Op } from 'sequelize';
import db from '../../models';

const getProblems = async (groupindices: number[]) => {
  const problems = await db.models.Problem.findAll({
    include: [{ model: db.models.Group, attributes: ['title'] }],
    order: [['idx', 'DESC']],
    where: { groupidx: { [Op.in]: groupindices } },
    logging: false
  });
  return problems;
};

const insertSolvedProblem = async (useridx: number, problemidx: number) => {
  await db.models.UserProblem.findOrCreate({
    where: { useridx, problemidx },
    logging: false
  });
};

const getSolvedProblems = async (userName: string) => {
  const userData = await db.models.User.findOne({
    where: { nickname: userName },
    logging: false
  });
  const solvedProblems = await db.models.UserProblem.findAll({
    where: { useridx: userData?.get().idx },
    logging: false
  });

  return solvedProblems;
};

export { getProblems, insertSolvedProblem, getSolvedProblems };
