/** @format */

'use strict';
/** @format */

const express = require('express');
const getUserPlaylists = require('../controllers/spotifyAPI/playlist/getUserPlaylists');

const spotifyRoutes = express.Router();

spotifyRoutes.route('/playlist').post(getUserPlaylists);

module.exports = spotifyRoutes;
