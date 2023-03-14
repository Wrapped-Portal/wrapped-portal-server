/** @format */

'use strict';
/** @format */

const express = require('express');
const getPlaylistItems = require('../controllers/spotifyAPI/playlist/getPlaylistItems');
const getMorePlaylistItems = require('../controllers/spotifyAPI/playlist/getMorePlaylistItems')
const getUserPlaylists = require('../controllers/spotifyAPI/playlist/getUserPlaylists');
const createPlaylists = require('../controllers/spotifyAPI/playlist/createPlaylist');
const getTopResults = require('../controllers/spotifyAPI/topResults/getTopResults');
const getRecommendations = require('../controllers/spotifyAPI/recommendations/getRecommendations');
const getUser = require('../controllers/spotifyAPI//user/getUser');
const getRecentlyPlayed = require('../controllers/spotifyAPI/playlist/getRecentlyPlayed');
const addTrackToPlaylist = require('../controllers/spotifyAPI/playlist/addTrackToPlaylist');

const getArtistTop = require('../controllers/spotifyAPI/topResults/getArtistTop');

const searchBar = require('../controllers/spotifyAPI/searchBar');

const removeTrackFromPlaylist = require('../controllers/spotifyAPI/playlist/removePlaylistItem');

const getAlbumTracks = require('../controllers/spotifyAPI/topResults/getAlbumTracks');


const spotifyRoutes = express.Router();


spotifyRoutes.route('/user').get(getUser);

spotifyRoutes.route('/artist').get(getArtistTop);

spotifyRoutes.route('/album').get(getAlbumTracks);

spotifyRoutes.route('/playlistitems').get(getPlaylistItems);

spotifyRoutes.route('/moreplaylist').get(getMorePlaylistItems);

spotifyRoutes.route('/playlist').get(getUserPlaylists);

spotifyRoutes.route('/makeplaylist').post(createPlaylists);

spotifyRoutes.route('/add').post(addTrackToPlaylist);

spotifyRoutes.route('/top').get(getTopResults);

spotifyRoutes.route('/recommendation').get(getRecommendations);

spotifyRoutes.route('/recent').post(getRecentlyPlayed);

spotifyRoutes.route('/search').get(searchBar);

spotifyRoutes.route('/remove').delete(removeTrackFromPlaylist);

module.exports = spotifyRoutes;
