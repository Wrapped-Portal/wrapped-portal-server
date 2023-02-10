const axios = require('axios');

async function createPlaylist(req, res) {
  const token = req.query.token;
  const name = req.body.name;
  const description = req.body.description;
  const isPublic = req.body.public;
  const user_id = req.body.user_id;

  try {
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.post(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
      name: name,
      description: description,
      public: isPublic
    }, options);

    res.status(201).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating playlist' });
  }
}


module.exports = createPlaylist;
