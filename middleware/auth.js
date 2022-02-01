/**
 * auth.js
 * @description :: middleware that checks authentication and authorization of user
 */

const passport = require('passport');
const {
  ROLE_RIGHTS, USER_ROLE
} = require('../constants/authConstant');
const responseHandler = require('../utils/response/responseHandler');
const { unAuthorized } = require('../utils/response');

const verifyCallback = (userTokensDb, req, resolve, reject, rights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject('Unauthorized User');
  }
  req.user = user;
  if (!user.isActive) {
    return reject('User is deactivated');
  }
  let userToken = await userTokensDb.findOne({
    token:(req.headers.authorization).replace('Bearer ',''),
    userId:user.id
  });
  if (!userToken){
    return reject('Token not found');
  }
  if (userToken.isTokenExpired){
    return reject('Token is Expired');
  }
  if (rights.length) {
    for (role in USER_ROLE){
      if (USER_ROLE[role] === user.role){
        const userRights = ROLE_RIGHTS[user.role];
        const hasRequiredRights = rights.some((requiredRight) => userRights.includes(requiredRight));
        if (!hasRequiredRights || !user.id) {
          return reject('Unauthorized user');
        }
      }
    }
  }
  resolve();
};

const auth = ({
  passport, userTokensDb
}) => (...rights) => async (req, res, next) => {

  let url = req.originalUrl;
    
  if (url.includes('device')){
    return new Promise((resolve, reject) => {
      passport.authenticate('device-rule', { session: false }, verifyCallback(userTokensDb,req, resolve, reject, rights))(
        req,
        res,
        next
      );
    })
      .then(() => next())
      .catch((err) => {
        responseHandler(res,unAuthorized());
      });
  }
    
  else if (url.includes('admin')){
    return new Promise((resolve, reject) => {
      passport.authenticate('admin-rule', { session: false }, verifyCallback(userTokensDb,req, resolve, reject, rights))(
        req,
        res,
        next
      );
    })
      .then(() => next())
      .catch((err) => {
        responseHandler(res,unAuthorized());
      });
  }
   
};

module.exports = auth;
