
const axios = require('axios');

async function getUserPlaylists(token) {
  try {
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.get('https://api.spotify.com/v1/me/playlists?limit=20', options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = getUserPlaylists;
