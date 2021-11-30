import express from 'express';

import isLogin from './isLogin';
import users from './users';
import posts from './posts';
import likes from './likes';
import image from './image';
import comments from './comments';
import problems from './problems';
import groups from './groups';
import profile from './profile';

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

router.put('/profile/:useridx', profile.update);
router.get('/profile/:username', profile.get);

module.exports = router;
