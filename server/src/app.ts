const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config({ path: path.resolve(__dirname, './config/.env.development')});

const indexRouter = require('./routes/index');
const oauthRouter = require('./routes/oauth');

const debug = require('debug')('server:server');
const http = require('http');
const app = express();
const port = 4000;

app.use(session({
    HttpOnly: true,
    secure: process.env.HTTPS_FALSE ? false : true,
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
