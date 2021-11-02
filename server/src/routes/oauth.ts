const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env.development')});
import * as express from 'express';
const githubOauth = require('../service/githubOauth');
const router = express.Router();

const redirectURL = process.env.LOCAL_CLIENT ?? '/';

router.get('/login', (req, res, next) => {
  res.json(githubOauth.authorizeURL);
});

router.get('/callback', async (req: any, res, next) => {
    if(!req.query.code) res.redirect(redirectURL);

    const accessToken = await githubOauth.getAccessToken(req.query.code);

    res.redirect(redirectURL + 'home');
})

module.exports = router;
