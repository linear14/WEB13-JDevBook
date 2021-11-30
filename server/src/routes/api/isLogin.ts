import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import dbManager from '../../service/dbManager';
import { DBUser } from '../../types/interface';
const oauth = require('../../config/oauth.json');

const isLogin = {
  check: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = jwt.verify(req.session.jwt, oauth.jwtKey) as {
        name: string;
      };
      if (name === req.session.username) {
        res.json(true);
      } else {
        req.session.destroy((err) => {
          res.json(false);
        });
      }
    } catch (err) {
      req.session.destroy((err) => {
        res.json(false);
      });
    }
  },
  userData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = jwt.verify(req.session.jwt, oauth.jwtKey) as {
        name: string;
      };
      if (name === req.session.username) {
        const userdata: DBUser = await dbManager.getUserData(name);
        res.json({
          data: userdata,
          error: false
        });
      } else {
        console.log(`로그인 정보 비정상 감지: ${req.session.username}`);
        req.session.destroy((err) => {
          res.json({ data: '', error: true });
        });
      }
    } catch (err) {
      req.session.destroy((err) => {
        res.json({ data: '', error: true });
      });
    }
  }
};

export default isLogin;
