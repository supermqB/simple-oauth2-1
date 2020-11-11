'use strict';

const app = require('express')();

const port = 3001;
const domain = '127.0.0.1';

module.exports = (cb) => {
  const callbackUrl = `http://${domain}:${port}/callback`;

  app.listen(port, (err) => {
    if (err) return console.error(err);

    console.log(`Express server listening at http://${domain}:${port}`);

    return cb({
      app,
      callbackUrl,
    });
  });
};
