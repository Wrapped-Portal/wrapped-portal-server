/** @format */

require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const PORT = process.env.PORT || 3001;
const { refreshCallback } = require('./controllers/refreshCallback.js');
const { loginCallback } = require('./controllers/loginCallback.js');
const getUserPlaylists = require('./controllers/spotifyAPI/playlist/getUserPlaylists');
const getTopResults = require('./controllers/spotifyAPI/topResults/getTopResults');
const getRecommendations = require('./controllers/spotifyAPI/recommendations/getReccommendations');
const createPlaylists = require('./controllers/spotifyAPI/playlist/createPlaylist');
const addTrackToPlaylist = require('./controllers/spotifyAPI/playlist/addTrackToPlaylist');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

const cors = require('cors');

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send({ Proof: 'Of Life' });
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
    .then((data) => {
      console.log(data.body);
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((error) => {
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
    .then((data) => {
      console.log(data.body);
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.sendStatus(400);
    });
});

app.get('/playlist', getUserPlaylists);

app.post('/playlist', createPlaylists);

app.post('/track', addTrackToPlaylist);

app.get('/top' , getTopResults);

app.get('/reccommendation', getRecommendations);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
