const passport = require('passport');

const LocalStrategy = require('./strategies/local.estrategy');
const JwtStrategy = require('./strategies/jwt.estrategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);
