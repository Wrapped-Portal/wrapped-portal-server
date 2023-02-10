// EXAMPLE URL https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks?uris=spotify%3Atrack%3A4iV5W9uYEdYUVa79Axb7Rh //////////////////////////  MAY NEED TO ADD TO ADD EXTRA DATA TO URI
const axios = require('axios');

async function addTrackToPlaylist(token, playlistId, trackUri) {
  try {
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`, {}, options);

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = addTrackToPlaylist;

