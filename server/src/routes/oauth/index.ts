import express from 'express';

import githubLogin from './login';
import logout from './logout';

const router = express.Router();

router.get('/login', githubLogin.authorize);
router.get('/callback', githubLogin.callback);
router.get('/logout', logout);

module.exports = router;
