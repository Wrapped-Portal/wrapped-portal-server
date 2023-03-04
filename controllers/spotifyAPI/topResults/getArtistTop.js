const axios = require('axios');

async function getArtistTop(req, res) {
  const token = req.query.token;
  const artistId = req.body.artistId;
  
  try {
    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
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

module.exports = getArtistTop;