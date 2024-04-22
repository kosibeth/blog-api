import passportJWT from 'passport-jwt';
import User from '../models/user.js';
import { env } from '../env.js';

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
  secretOrKey: env.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const strategyCallback = async (payload, done) => {
  try {
    if (payload.expire <= Date.now()) {
      throw new Error("TokenExpired");
    }

    const user = await User.findById(payload.id)
  
    return done(null, user);
  } catch (error) {
    done(error);
  }
}

const loadStrategy = () => {
  const strategy = new Strategy(params, strategyCallback);

  return strategy
};

export default {
  strategy: loadStrategy
}
