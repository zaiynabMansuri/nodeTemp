
const {
  Strategy, ExtractJwt 
} = require('passport-jwt');
const { JWT } = require('../constants/authConstant');

const devicePassportStrategy = ({ userDb }) => async (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); 
  options.secretOrKey = JWT.DEVICE_SECRET;
        
  passport.use('device-rule',
    new Strategy(options, async (payload, done) => {
            
      try {
        const user = await userDb.findOne({ _id: payload.id });
        if (user) {
          return done(null, { ...user.toJSON() });
        }
        return done('No User Found', {});
      } catch (error) {
        return done(err,{});
      }
    })
  );
};
module.exports = devicePassportStrategy;