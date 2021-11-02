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
    const username = await githubOauth.getUsername(accessToken);
    
    // db에 아이디 저장하고 확인하는 작업

    req.session.username = username; // session에 jwt 결합해볼까
    req.session.save((err: any) => {
      if(err){
        console.error(err);
        return res.status(500).send("<h1>500 error</h1>");
      }
      res.redirect(redirectURL + 'home');
    })    
    
});

router.get('/logout', (req: any, res, next) => {

});

module.exports = router;
