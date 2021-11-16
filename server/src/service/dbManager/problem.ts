import db from '../../models';

const getProblems = async (groupidx: number) => {
  const problems = await db.models.Problem.findAll({
    order: [['idx', 'DESC']],
    where: { groupidx },
    logging: false
  });
  return problems;
};

export { getProblems };
