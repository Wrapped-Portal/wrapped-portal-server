const axios = require('axios');

async function removePlaylistItem(req, res) {
  const token = req.query.token;
  const playlistId = req.body.playlistId;
  const trackUri = req.body.trackUri;
  const index = req.body.index;

  try {
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: {
        "tracks": [
          {
            "uri": trackUri,
            "positions": [index]
          }
        ]
      }
    };
    

    const response = await axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, options);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error removing tracks from playlist' });
  }
}

module.exports = removePlaylistItem;