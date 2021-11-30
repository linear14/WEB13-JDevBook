import { Request, Response, NextFunction } from 'express';
import dbManager from '../../service/dbManager';

const users = {
  search: async (
    req: Request<{}, {}, {}, { keyword: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { keyword } = req.query;
      const searchedUsers = keyword ? await dbManager.searchUsers(keyword) : [];
      res.json(searchedUsers);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  },
  all: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allUsers = await dbManager.getAllUsers();
      res.json(allUsers);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  }
};

export default users;
