import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../config/.env.development') });
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dbManager from '../service/dbManager';
import { DBUser } from 'service/interface';
const githubOauth = require('../service/githubOauth');
const oauth = require('../config/oauth.json');

const router = express.Router();

const clientURL: string = process.env.LOCAL_CLIENT ?? '/';

router.get('/data', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = jwt.verify(req.session.jwt, oauth.jwtKey) as {
      name: string;
    };
    if (name === req.session.username) {
      const userdata: DBUser = await dbManager.getUserdata(name);
      res.json({
        name: req.session.username,
        data: userdata,
        error: false
      });
    } else {
      console.log(`로그인 정보 비정상 감지: ${req.session.username}`);
      req.session.destroy((err) => {
        // 세션이 하나 생성되어서 지워줘야..
        res.json({ name: '', error: true });
      });
    }
  } catch (err) {
    // 로그인안하고 home 등 직접적인 접근
    //console.error(err);
    req.session.destroy((err) => {
      // 세션이 하나 생성되어서 지워줘야..
      res.json({ name: '', error: true });
    });
  }
});

router.get(
  '/users',
  async (
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
  }
);

module.exports = router;
