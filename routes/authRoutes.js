/** @format */

'use strict';

const express = require('express');
const { loginCallback } = require('../controllers/loginCallback');
const { refreshCallback } = require('../controllers/refreshCallback');

const AuthRoutes = express.Router();

AuthRoutes.route('/refresh').post(refreshCallback);
AuthRoutes.route('/login').post(loginCallback);

module.exports = AuthRoutes;
