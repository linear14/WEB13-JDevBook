const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env.development')});
import * as express from 'express';
const githubOauth = require('../service/githubOauth');
const oauth = require('../config/oauth.json');
const jwt = require('jsonwebtoken');
const router = express.Router();

const clientURL = process.env.LOCAL_CLIENT ?? '/';

router.get('/login', (req, res, next) => {
  res.json(githubOauth.authorizeURL);
});

router.get('/callback', async (req: any, res, next) => {
    if(!req.query.code) res.redirect(clientURL);

    const accessToken = await githubOauth.getAccessToken(req.query.code);
    const username = await githubOauth.getUsername(accessToken);
    
    // db에 아이디 저장하고 확인하는 작업
    // 로그인 하면 login 페이지로 갈 수 없게도 해야...
    // 반대로 로그인 안했으면 login 페이지를 벗어날 수 없게 해야...

    req.session.username = username;
    req.session.jwt = jwt.sign({
      name: username,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24시간
    }, oauth.jwtKey);

    req.session.save((err: any) => {
      if(err){
        console.error(err);
        return res.status(500).send("<h1>500 error</h1>");
      }
      res.redirect(clientURL + 'home');
    })    
    
});

router.get('/data', (req: any, res, next) => {
  try{
    const verified = jwt.verify(req.session.jwt, oauth.jwtKey);
    if(verified.name === req.session.username) res.json(req.session.username);
    else {
      console.log(`로그인 정보 비정상 감지: ${req.session.username}`);
      res.redirect('/oauth/logout');
    }
  } catch(err){
    console.error(err);
    res.redirect('/oauth/logout');
  }

})

router.get('/logout', (req: any, res, next) => {
  const username = req.session.username;
  // 삭제는 잘 되는데 client에서 session은 그대로 남아있음
  // 물론 서버에서 검사하면 이미 사라진 세션이라 오류처리 가능
  req.session.destroy((err: any) => {
    if(err) console.error(err);
    console.log(`로그아웃 정상 작동: ${username}`);
    res.redirect(clientURL);
    // res.status(200).json({message : `${username} Logged Out`});
  })
});

module.exports = router;
