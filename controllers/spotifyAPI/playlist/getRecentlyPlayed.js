/** @format */

const axios = require('axios');

async function getRecentlyPlayed(req, res) {
  const { token } = req.body;

  try {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      'https://api.spotify.com/v1/me/player/recently-played',

      options,
    );
    res.status(200).json(response.data.items[0].track.uri);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error retrieving recently played' });
  }
}

module.exports = getRecentlyPlayed;
