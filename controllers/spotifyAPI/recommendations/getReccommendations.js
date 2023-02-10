const axios = require('axios');

const getRecommendations = async (token, query, genre, dnce, energy, loud, vibe) => {
  try {
    const artistSearch = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`,
      headers: {
        'accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    const artistId = artistSearch.data.artists.items[0].id;

    const songArr = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/recommendations?limit=9&seed_artists=${artistId}&seed_genres=${genre}&target_danceability=${dnce}&target_energy=${energy}&target_loudness=${loud}&target_valence=${vibe}`,
      headers: {
        'accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    return songArr.data;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = getRecommendations;
