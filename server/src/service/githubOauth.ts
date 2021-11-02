const oauth = require('../config/oauth.json');
const github = process.env.LOCAL_CLIENT ? oauth.githubLocal : oauth.github;

const githubOauth = {
    authorizeURL: `https://github.com/login/oauth/authorize?client_id=${github.CLIENT_ID}&redirect_uri=${github.CALLBACK_URL}`,
    getAccessToken: (authcode: string) => {
        
    }
}

module.exports = githubOauth;