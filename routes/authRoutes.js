/** @format */

'use strict';

const express = require('express');
const { loginCallback } = require('../controllers/loginCallback');
const { refreshCallback } = require('../controllers/refreshCallback');

const AuthRoutes = express.Router();

AuthRoutes.route('/refresh').post(refreshCallback);
AuthRoutes.route('/login').post(loginCallback);
AuthRoutes.route('/connect').get((req, res, next) =>
  res.status(200).send({ connected: 'connected' }),
);
module.exports = AuthRoutes;
