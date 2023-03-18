const axios = require('axios');

async function getTrackFeatures(req, res) {
  const token = req.query.token;
  const trackId = req.query.id;
  
  try {
    const response = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving audio features' });
  }
}

module.exports = getTrackFeatures;