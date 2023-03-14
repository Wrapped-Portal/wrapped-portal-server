const axios = require('axios');

async function getMorePlaylistItems(req, res) {
  const token = req.query.token;
  const playlistId = req.query.playlistId;
  const offset = req.query.offset;

  try {
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50&offset=${offset}`, options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving playlist tracks' });
  }
}

module.exports = getMorePlaylistItems;
