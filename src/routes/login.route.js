const passport = require('passport');
const loginRouter = require('express').Router();

const { login } = require('./login.controller');

loginRouter.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true,
  }),
  login
);

module.exports = loginRouter;
