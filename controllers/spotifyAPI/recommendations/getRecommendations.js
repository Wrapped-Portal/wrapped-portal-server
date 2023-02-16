/** @format */

const axios = require('axios');

const getRecommendations = async (req, res) => {
  const token = req.query.token;
  const artist = req.query.artist;
  const genre = req.query.genre;
  const dance = req.query.dance;
  const energy = req.query.energy;
  const loud = req.query.loud;
  const vibe = req.query.vibe;
  const tempo = req.query.tempo;
  const popular = req.query.popular;
  const instrumental = req.query.instrumental;

  let songArrUrl = `https://api.spotify.com/v1/recommendations?limit=9`;

  switch (true) {
    case Boolean(genre):
      songArrUrl += `&seed_genres=${genre}`;
      break;
    case Boolean(dance):
      songArrUrl += `&target_danceability=${dance}`;
      break;
    case Boolean(energy):
      songArrUrl += `&target_energy=${energy}`;
      break;
    case Boolean(loud):
      songArrUrl += `&target_loudness=${loud}`;
      break;
    case Boolean(vibe):
      songArrUrl += `&target_valence=${vibe}`;
      break;
    case Boolean(tempo):
      songArrUrl += `&target_tempo=${tempo}`;
      break;
    case Boolean(popular):
      songArrUrl += `&target_popularity=${popular}`;
      break;
    case Boolean(instrumental):
      songArrUrl += `&target_instrumentalness=${instrumental}`;
      break;
  }

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

    console.log(artistId);

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
