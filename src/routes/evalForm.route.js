const { submitForm } = require('./evalForm.controller');

const evalFormRouter = require('express').Router();

evalFormRouter.post('/', submitForm);

module.exports = evalFormRouter;
