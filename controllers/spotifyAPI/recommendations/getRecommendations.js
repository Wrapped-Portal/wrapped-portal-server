/** @format */

const axios = require('axios');

const getRecommendations = async (req, res) => {
  const token = req.query.token;
  const query = req.query.query;
  const genre = req.query.genre;
  const dnce = req.query.dnce;
  const energy = req.query.energy;
  const loud = req.query.loud;
  const vibe = req.query.vibe;

  try {
    const artistSearch = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`,
      headers: {
        accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const artistId = artistSearch.data.artists.items[0].id;

    const songArr = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/recommendations?limit=9&seed_artists=${artistId}&seed_genres=${genre}&target_danceability=${dnce}&target_energy=${energy}&target_loudness=${loud}&target_valence=${vibe}`,
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
