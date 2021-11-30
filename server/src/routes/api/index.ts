import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
  path: path.resolve(__dirname, '../../config/.env.development')
});
import express, { Request, Response, NextFunction } from 'express';
import dbManager from '../../service/dbManager';
import { DBUser, CommentData, IProfile } from '../../types/interface';

import isLogin from './isLogin';
import users from './users';
import posts from './posts';
import likes from './likes';
import image from './image';

const router = express.Router();

router.get('/data', isLogin.userData);
router.get('/islogin', isLogin.check);

router.get('/users', users.search);
router.get('/allUsers', users.all);

router.get('/posts', posts.get);
router.post('/posts', posts.add);
router.put('/posts/:postidx', posts.update);
router.delete('/posts/:postidx', posts.delete);

router.put('/posts/like/:postidx', likes.update);
router.post('/likes/:useridx/:postidx', likes.toggle);

router.post('/uploadimg', image.upload, image.send);

router.get(
  '/comments/:postidx',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postidx = Number(req.params.postidx);
      const result = await dbManager.getComments(postidx);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.json(false);
    }
  }
);

router.post(
  '/comments',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addComment: CommentData = req.body;
      const result = await dbManager.addComment(addComment);
      res.json({ result: result, check: true });
    } catch (err) {
      console.error(err);
      res.json({ check: false });
    }
  }
);

router.get(
  '/problems/:groupidx',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupIdx = Number(req.params.groupidx);
      const problems = groupIdx ? await dbManager.getProblems([groupIdx]) : [];
      res.json(problems);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  }
);

router.get(
  '/problems',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await dbManager.getUserJoinedGroups(req.session.useridx);
      const groupIndices = JSON.parse(JSON.stringify(groups)).map(
        (item: any) => item.groupidx
      );
      const problems = await dbManager.getProblems(groupIndices);
      res.json(problems);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  }
);

router.get(
  '/problems/joined/:useridx',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userIdx = Number(req.params.useridx);
      const groups = await dbManager.getUserJoinedGroups(userIdx);
      const groupIndices = JSON.parse(JSON.stringify(groups)).map(
        (item: any) => item.groupidx
      );
      const problems = await dbManager.getProblems(groupIndices);
      res.json(problems);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  }
);

router.post(
  '/problems/correct',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userIdx = req.session.useridx;
      const { problemIdx } = req.body;
      await dbManager.insertSolvedProblem(userIdx, Number(problemIdx));
      res.json(true);
    } catch (err) {
      res.json(false);
    }
  }
);

router.get(
  '/problems/solved/:username',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userName = req.params.username;
      const result = await dbManager.getSolvedProblems(userName);
      res.json(result);
    } catch (err) {
      res.json(false);
    }
  }
);

router.get(
  '/groups',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupList = await dbManager.getGroupList();
      res.json(groupList);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  }
);

router.get(
  '/groups/:groupidx',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupIdx: number = Number(req.params.groupidx);
      const group = await dbManager.getGroup(groupIdx);
      res.json(group);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  }
);

router.get(
  '/groups/joined/:useridx',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userIdx: number = Number(req.params.useridx);
      const group = await dbManager.getUserJoinedGroups(userIdx);
      res.json(group);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  }
);

router.get(
  '/groups/usernum/:groupidx',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupIdx: number = Number(req.params.groupidx);
      const userNum = await dbManager.getUserNumInGroup(groupIdx);
      res.json(userNum);
    } catch (err) {
      console.error(err);
      res.json([]);
    }
  }
);

router.post(
  '/joingroup/:useridx/:postidx',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const useridx = Number(req.params.useridx);
      const postidx = Number(req.params.postidx);
      const result = await dbManager.toggleUserGroup(useridx, postidx);
      res.json(result);
    } catch (err) {
      res.json(false);
    }
  }
);

router.put(
  '/profile/:useridx',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userIdx = Number(req.params.useridx);
      const userUpdateData: IProfile = req.body;
      await dbManager.updateProfile(userUpdateData, userIdx);
      res.json({ check: true });
    } catch (err) {
      console.error(err);
      res.json({ check: false });
    }
  }
);

router.get(
  '/profile/:username',
  async (req: Request, res: Response, next: NextFunction) => {
    const name: string = req.params.username;
    const userdata: DBUser = await dbManager.getProfile(name);
    if (userdata === undefined) res.json({ data: '', error: true });
    else res.json({ data: userdata, error: false });
  }
);

module.exports = router;
