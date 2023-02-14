/** @format */

'use strict';
/** @format */

const express = require('express');
const getUserPlaylists = require('../controllers/spotifyAPI/playlist/getUserPlaylists');
const createPlaylists = require('../controllers/spotifyAPI/playlist/createPlaylist');
const addTrackToPlaylist = require('../controllers/spotifyAPI/playlist/addTrackToPlaylist');
const getTopResults = require('../controllers/spotifyAPI/topResults/getTopResults');
const getRecommendations = require('../controllers/spotifyAPI/recommendations/getRecommendations');
const spotifyRoutes = express.Router();

spotifyRoutes.route('/playlist').get(getUserPlaylists);

spotifyRoutes.route('/playlist').post(createPlaylists);

spotifyRoutes.route('/track').post(addTrackToPlaylist);

spotifyRoutes.route('/top').get(getTopResults);

spotifyRoutes.route('/recommendation').get(getRecommendations);

module.exports = spotifyRoutes;
