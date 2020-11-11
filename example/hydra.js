'use strict';

const createApplication = require('.');
const { AuthorizationCode } = require('..');

createApplication(({ app, callbackUrl }) => {
  const client = new AuthorizationCode({
    client: {
      id: 'simple-oauth2',
      secret: 'pVksLHlscq.WEvg-k9YmDDu5Sf',
    },
    auth: {
      tokenHost: 'http://127.0.0.1:4444',
      tokenPath: '/oauth2/token',
      authorizePath: '/oauth2/auth',
    },
  });

  const oAuthOptions = {
    redirect_uri: callbackUrl,
    scope: ['openid', 'offline', 'offline_access'],
    state: '3(#0/!~mnscjxxngsacbumpftmmevnp',
  };

  app.get('/auth', (req, res) => {
    res.redirect(client.authorizeURL(oAuthOptions));
  });

  // Callback service parsing the authorization token and asking for the access token
  app.get('/callback', async (req, res) => {
    const { code } = req.query;

    try {
      const accessToken = await client.getToken({
        code,
        ...oAuthOptions,
      });

      console.log('The resulting token: ', accessToken.token);

      return res.status(200).json(accessToken.token);
    } catch (error) {
      console.error('Access Token Error', error.message);
      return res.status(500).json('Authentication failed');
    }
  });

  app.get('/', (req, res) => {
    res.send('Hello<br><a href="/auth">Login through hydra.</a>');
  });
});
