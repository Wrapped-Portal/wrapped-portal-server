require('dotenv').config();
const express = require('express');
const app = express();
const SpotifyWebApi = require('spotify-web-api-node');
const PORT = process.env.PORT || 3001;
const { refreshCallback } = require('./controllers/refreshCallback.js');
const { loginCallback } = require('./controllers/loginCallback.js');
const getUserPlaylists = require('./controllers/spotifyAPI/playlist/getUserPlaylists');

app.get('/', (req, res) => {
  res.status(200);
});

app.post('/login', loginCallback);

app.post('/refresh', refreshCallback);

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      console.log(data.body);
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(error => {
      console.log(error.message);
      res.sendStatus(400);
    });
});

app.post('/about', (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });
  spotifyApi
    .refreshAccessToken(code)
    .then(data => {
      console.log(data.body);
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(error => {
      console.log(error.message);
      res.sendStatus(400);
    });
});

app.get('/playlist', getUserPlaylists);



app.listen(PORT, () => console.log(`listening on ${PORT}`));
