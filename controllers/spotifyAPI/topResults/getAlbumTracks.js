const axios = require('axios');

async function getAlbumTracks(req, res) {
  const token = req.query.token;
  const albumId = req.body.albumId;
  
  try {
    const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks?market=US&limit=50`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving top results' });
  }
}

module.exports = getAlbumTracks;