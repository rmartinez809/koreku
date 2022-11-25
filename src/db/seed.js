require('dotenv').config()

const { buildDB } = require('./seedData');

buildDB();