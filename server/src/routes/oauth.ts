import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../config/.env.development')});
import express, {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
const githubOauth = require('../service/githubOauth');
const oauth = require('../config/oauth.json');

const router = express.Router();

const clientURL: string = process.env.LOCAL_CLIENT ?? '/';

declare module "express-session" {
  interface Session {
    username: string,
    jwt: string
  }
}

router.get('/login', (req: Request, res: Response, next: NextFunction) => {
  res.json(githubOauth.authorizeURL);
});

router.get('/callback', async (req: Request, res: Response, next: NextFunction) => {
    if(!req.query.code) res.redirect(clientURL);

    const accessToken: string = await githubOauth.getAccessToken(req.query.code);
    const username: string = await githubOauth.getUsername(accessToken);
    
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

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
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
