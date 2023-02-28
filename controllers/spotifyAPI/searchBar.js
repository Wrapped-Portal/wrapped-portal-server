/** @format */

const axios = require('axios');

async function searchSongs(req, res) {
  const token = req.query.token;
  const queryString = req.query.search.split(' ').join('%20');
  try {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const tracksResponse = await axios.get(
      `https://api.spotify.com/v1/search?q=${queryString}&type=track&limit=6`,
      options,
    );
    const tracks = JSON.parse(JSON.stringify(tracksResponse.data));

    const artistsResponse = await axios.get(
      `https://api.spotify.com/v1/search?q=${queryString}&type=artist&limit=6`,
      options,
    );
    const artists = JSON.parse(JSON.stringify(artistsResponse.data));

    const albumsResponse = await axios.get(
      `https://api.spotify.com/v1/search?q=${queryString}&type=album&limit=6`,
      options,
    );
    const albums = JSON.parse(JSON.stringify(albumsResponse.data));

    res.status(200).json({ tracks, artists, albums });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving songs' });
  }
}

module.exports = searchSongs;
