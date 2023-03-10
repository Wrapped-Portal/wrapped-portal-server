/** @format */

const axios = require('axios');

async function createPlaylist(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const name = req.body.name;
  const description = req.body.description;
  const isPublic = req.body.public;
  const user_id = req.body.user_id;

  try {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `https://api.spotify.com/v1/users/${user_id}/playlists`,
      {
        name: name,
        description: description,
        public: isPublic,
      },
      options,
    );

    res.status(201).json(response.data);
    console.log('playlist Created');
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error creating playlist' });
  }
}

module.exports = createPlaylist;
