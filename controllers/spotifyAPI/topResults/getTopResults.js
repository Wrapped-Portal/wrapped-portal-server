const axios = require('axios');

async function getTopTracks(token, type, range) {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/top/${type}?time_range=${range}&limit=25`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = getTopTracks;
