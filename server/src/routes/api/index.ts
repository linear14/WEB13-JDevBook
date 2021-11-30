import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
  path: path.resolve(__dirname, '../../config/.env.development')
});
import express, { Request, Response, NextFunction } from 'express';
import dbManager from '../../service/dbManager';
import { DBUser, IProfile } from '../../types/interface';

import isLogin from './isLogin';
import users from './users';
import posts from './posts';
import likes from './likes';
import image from './image';
import comments from './comments';
import problems from './problems';
import groups from './groups';

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

router.get('/comments/:postidx', comments.get);
router.post('/comments', comments.add);

router.get('/problems/:groupidx', problems.oneGroup);
router.get('/problems', problems.myGroups);
router.get('/problems/joined/:useridx', problems.useridxGroups);
router.post('/problems/correct', problems.addCorrect);
router.get('/problems/solved/:username', problems.getCorrect);

router.get('/groups', groups.all);
router.get('/groups/:groupidx', groups.search);
router.get('/groups/joined/:useridx', groups.joined);
router.get('/groups/usernum/:groupidx', groups.userNum);
router.post('/joingroup/:useridx/:postidx', groups.joinLeave);

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
