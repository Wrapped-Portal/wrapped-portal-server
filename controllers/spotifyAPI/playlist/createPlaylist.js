const axios = require('axios');

async function createPlaylist(token, name, description, isPublic, user_id) {
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

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = createPlaylist;
