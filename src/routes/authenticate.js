const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(function verify(username, password, done) {}));
