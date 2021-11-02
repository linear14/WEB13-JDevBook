const oauth = require('../config/oauth.json');
const github = process.env.LOCAL_CLIENT ? oauth.githubLocal : oauth.github;
const axios = require('axios');

const githubOauth = {
    authorizeURL: `https://github.com/login/oauth/authorize?client_id=${github.CLIENT_ID}&redirect_uri=${github.CALLBACK_URL}`,
    getAccessToken: (authcode: string) => {
        return axios({
            method: 'POST',
            url: `https://github.com/login/oauth/access_token?client_id=${github.CLIENT_ID}&client_secret=${github.CLIENT_SECRET}&code=${authcode}&redirect_uri=${github.CALLBACK_URL}`,
            headers: {
                'content-type': 'application/json'
            }
        });
    }
}

module.exports = githubOauth;