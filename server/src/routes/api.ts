import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../config/.env.development') });
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import dbManager from '../service/dbManager';
import { DBUser, PostAddData, PostUpdateData } from '../types/interface';
import { objectStorage, upload } from '../service/objectStorage';
const githubOauth = require('../service/githubOauth');
const oauth = require('../config/oauth.json');

const router = express.Router();
//const upload = multer({ dest: 'uploads/' });
const clientURL: string = process.env.LOCAL_CLIENT ?? '/';

router.get('/data', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = jwt.verify(req.session.jwt, oauth.jwtKey) as {
      name: string;
    };
    if (name === req.session.username) {
      const userdata: DBUser = await dbManager.getUserdata(name);
      res.json({
        data: userdata,
        error: false
      });
    } else {
      console.log(`로그인 정보 비정상 감지: ${req.session.username}`);
      req.session.destroy((err) => {
        // 세션이 하나 생성되어서 지워줘야..
        res.json({ data: '', error: true });
      });
    }
  } catch (err) {
    // 로그인안하고 home 등 직접적인 접근
    //console.error(err);
    req.session.destroy((err) => {
      // 세션이 하나 생성되어서 지워줘야..
      res.json({ data: '', error: true });
    });
  }
});

router.get('/islogin', (req: Request, res: Response, next: NextFunction) => {
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

router.get(
  '/posts',
  async (
    req: Request<{}, {}, {}, { lastIdx: number; count: number }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const myIdx = req.session.useridx;
      const { lastIdx, count } = req.query;
      const posts = await dbManager.getPosts(
        myIdx,
        Number(lastIdx),
        Number(count)
      );
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  }
);

router.post(
  '/posts',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PostAddData: PostAddData = req.body;
      const postData = await dbManager.addPost(PostAddData);
      res.json({ result: postData, check: true });
    } catch (err) {
      console.error(err);
      res.json({ result: {}, check: false });
    }
  }
);

router.put(
  '/posts/:postidx',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postIdx = Number(req.params.postidx);
      const postUpdateData: PostUpdateData = req.body;
      await dbManager.updatePost(postUpdateData, postIdx);
      res.json({ check: true });
    } catch (err) {
      console.error(err);
      res.json({ check: false });
    }
  }
);

router.delete(
  '/posts/:postidx',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postIdx = Number(req.params.postidx);
      await dbManager.deletePost(postIdx);
      res.json(true);
    } catch (err) {
      console.error(err);
      res.json(false);
    }
  }
);

router.get(
  '/allUsers',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allUsers = await dbManager.getAllUsers();
      res.json(allUsers);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  }
);

router.put(
  '/posts/like/:postidx',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postIdx = Number(req.params.postidx);
      const { likeNum } = req.body;
      await dbManager.updateLikeNum(postIdx, likeNum);
      res.json(true);
    } catch (err) {
      console.error(err);
      res.json(false);
    }
  }
);

router.post(
  '/likes/:useridx/:postidx',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const useridx = Number(req.params.useridx);
      const postidx = Number(req.params.postidx);
      const result = await dbManager.toggleLikePosts(useridx, postidx);
      res.json(result);
    } catch (err) {
      res.json(false);
    }
  }
);

router.post(
  '/uploadimg',
  upload.single('imgfile'), // multer-s3 location 추가됨
  async (req: Request, res: Response, next: NextFunction) => {
    const s3file = req.file;
    if (s3file) res.json({ file: s3file, save: true });
    else res.json({ save: false });
    // type 생각하면 형식 똑같이 해야되나?
  }
);

module.exports = router;
