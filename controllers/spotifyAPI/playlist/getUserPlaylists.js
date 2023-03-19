const axios = require('axios');

async function getUserPlaylists(req, res) {
  const token = req.query.token;


  try {
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.get('https://api.spotify.com/v1/me/playlists?limit=50', options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving user playlists' });
  }
}


module.exports = getUserPlaylists;
