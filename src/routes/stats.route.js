const { getStats } = require('./stats.controller');

const statsRouter = require('express').Router();

statsRouter.get('/', getStats);

module.exports = statsRouter;
