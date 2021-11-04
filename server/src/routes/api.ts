import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../config/.env.development') });
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const githubOauth = require('../service/githubOauth');
const oauth = require('../config/oauth.json');

const router = express.Router();

const clientURL: string = process.env.LOCAL_CLIENT ?? '/';

declare module 'express-session' {
  interface Session {
    username: string;
    jwt: string;
  }
}

router.get('/data', (req: Request, res: Response, next: NextFunction) => {
  try {
    const verified = jwt.verify(req.session.jwt, oauth.jwtKey) as {
      name: string;
    };
    if (verified.name === req.session.username) res.json(req.session.username);
    else {
      console.log(`로그인 정보 비정상 감지: ${req.session.username}`);
      res.redirect('/oauth/logout');
    }
  } catch (err) {
    console.error(err);
    res.redirect('/oauth/logout');
  }
});

module.exports = router;
