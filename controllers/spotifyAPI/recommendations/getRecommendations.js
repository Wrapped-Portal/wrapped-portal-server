/** @format */

const axios = require('axios');

const getRecommendations = async (req, res) => {
  const token = req.query.token;
  const artist = req.query.artist;
  const genre = req.query.stringifiedGenre;
  const dance = req.query.dance;
  const energy = req.query.energy;
  const loud = req.query.loud;
  const vibe = req.query.vibe;
  const tempo = req.query.tempo;
  const popular = req.query.popular;
  const instrumental = req.query.instrumental;



  let songArrUrl = `https://api.spotify.com/v1/recommendations?limit=18`;

  if (genre) {
    songArrUrl += `&seed_genres=${genre}`;
  }
  if (dance) {
    songArrUrl += `&target_danceability=${dance}`;
  }
  if (energy) {
    songArrUrl += `&target_energy=${energy}`;
  }
  if (loud) {
    songArrUrl += `&target_loudness=${loud}`;
  }
  if (vibe) {
    songArrUrl += `&target_valence=${vibe}`;
  }
  if (tempo) {
    songArrUrl += `&target_tempo=${tempo}`;
  }
  if (popular) {
    songArrUrl += `&target_popularity=${popular}`;
  }
  if (instrumental) {
    songArrUrl += `&target_instrumentalness=${instrumental}`;
  }

  console.log(songArrUrl);

  try {
    const artistSearch = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`,
      headers: {
        accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const artistId = artistSearch.data.artists.items[0].id;

    if (artistId) {
      songArrUrl += `&seed_artists=${artistId}`;
    }

    console.log(songArrUrl);

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

