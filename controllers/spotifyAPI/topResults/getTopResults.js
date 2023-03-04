const axios = require('axios');

async function getTopResults(req, res) {
  const token = req.query.token;
  const type = req.query.type;
  const range = req.query.range;
  
  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/top/${type}?time_range=${range}&limit=50`, {
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

module.exports = getTopResults;