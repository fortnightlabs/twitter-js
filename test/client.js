/**
 * IMPORTANT:
 * In order to make this test work add
 * 127.0.0.1 twitter-js to your /etc/hosts
 */

var express = require('express'),
    connect = require('connect'),
    twitterClient = require('./../')(
      'yourKey',
      'yourPass'
    ),
    app = express.createServer(
      connect.bodyParser(),
      connect.cookieParser(),
      connect.session({ secret: 'yourSecret' })
    );

app.set('views', __dirname);

app.get('/', function (req, res) {
  twitterClient.getAccessToken(req, res, function (error, token) {
    res.render('client.jade', {
      layout: false,
      locals: {
        token: token
      }
    });
  });
});

app.post('/message', function (req, res) {
  twitterClient.apiCall(
    'POST',
    '/statuses/update.json',
    {
      token: {
        oauth_token_secret: req.param('oauth_token_secret'),
        oauth_token: req.param('oauth_token'),
        status: req.param('message')
      }
    },
    function (error, result) {
      console.log(error);
      console.log(result);
      res.render('done.jade', {layout: false});
    }
  );
});

app.listen(3003);
