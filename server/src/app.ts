import express from "express";
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, './config/.env.development')});

import db from "./sequelize/models";
const indexRouter = require('./routes/index');
const oauthRouter = require('./routes/oauth');

const debug = require('debug')('server:server');
const http = require('http');
const app = express();
const port = 4000;
const FileStore = sessionFileStore(session);

db.sequelize.sync({ force: true })
.then(() => {
  console.log('db 연결 성공')
})
.catch((err) => {
  console.error(err);
})

app.use(session({
    //HttpOnly: true,
    //secure: process.env.HTTPS_FALSE ? false : true,
    // typescript es6 import 형식으로 바꾸면서 secure는 자동 설정 되는듯?
    // 배포해서 https로 실험해봐야 확실할듯...
    secret: 'secret key', // 암호화할 때 쓰이는 키라는데...
    resave: false,
	  saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.HTTPS_FALSE ? false : true,
      maxAge: 24000 * 60 * 60
    },
    store: new FileStore({path: path.resolve(__dirname, './sessions/')})
}))

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`✅ Server Listening on : http://localhost:${port}`);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', indexRouter);
app.use('/oauth', oauthRouter);

module.exports = app;
