/** @format */

const axios = require('axios');

const getRecommendations = async (req, res) => {
  const token = req.query.token;
  const type = req.query.type;
  const input = req.query.input;
  const genre = req.query.stringifiedGenre;
  const dance = req.query.dance;
  const energy = req.query.energy;
  const loud = req.query.loud;
  const vibe = req.query.vibe;
  const tempo = req.query.tempo;
  const popular = req.query.popular;
  const instrumental = req.query.instrumental;
  const acoustic = req.query.acoustic;
  const live = req.query.live;

  let songArrUrl = `https://api.spotify.com/v1/recommendations?limit=25`;

  if (genre) {
    songArrUrl += `&seed_genres=${genre}`;
  }
  if (dance) {
    const danceNum = parseFloat(dance);
    const danceDivided = danceNum / 100;
    songArrUrl += `&target_danceability=${danceDivided}`;
  }
  if (energy) {
    const energyNum = parseFloat(energy); 
    const energyDivided = energyNum / 100;
    songArrUrl += `&target_energy=${energyDivided}`;
  }
  if (loud) {
    const loudNum = parseFloat(loud);
    const loudDivided = loudNum / 100;
    songArrUrl += `&target_loudness=${loudDivided}`;
  }
  if (vibe) {
    const vibeNum = parseFloat(vibe);
    const vibeDivided = vibeNum / 100;
    songArrUrl += `&target_valence=${vibeDivided}`;
  }
  if (tempo) {
    const tempoNum = parseFloat(tempo);
    const tempoDivided = 1.4 * tempoNum + 60;
    const roundedTempo = Math.round(tempoDivided);
    songArrUrl += `&target_tempo=${roundedTempo}`;
  }
  if (popular) {
    songArrUrl += `&target_popularity=${popular}`;
  }
  if (acoustic) {
    const acousticNum = parseFloat(acoustic);
    const acousticDivided = acousticNum / 100;
    songArrUrl += `&target_acousticness=${acousticDivided}`;
  }
  if (instrumental) {
    const instrumentalNum = parseFloat(instrumental);
    const instrumentalDivided = instrumentalNum / 100;
    songArrUrl += `&target_instrumentalness=${instrumentalDivided}`;
  }
  if (live) {
    const liveNum = parseFloat(live);
    const liveDivided = liveNum / 100;
    songArrUrl += `&target_liveness=${liveDivided}`;
  }

  try {
    const response = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${input}&type=${type}&limit=1`,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    );

    if (response.data.artists) {
      songArrUrl += `&seed_artists=${response.data.artists.items[0].id}`;
    }
    if (response.data.tracks) {
      songArrUrl += `&seed_tracks=${response.data.tracks.items[0].id}`;
    }

    const songArr = await axios({
      method: 'get',
      url: songArrUrl,
      headers: {
        accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    res.status(200).json(songArr.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error retrieving song recommendations' });
  }
};

module.exports = getRecommendations;

