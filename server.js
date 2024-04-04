const express = require('express');
const session = require('express-session');
const routes = require('./controllers');

const sequelize = require('./config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = 0;
