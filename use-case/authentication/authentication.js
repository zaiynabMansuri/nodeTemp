
const response = require('../../utils/response');
const makeLoginUser = require('../common/loginUser'); 

const authentication = ({
  userDb,userTokensDb,userRoleDb,routeRoleDb
}) => async (data, url,req = {},res = {}) => {
  let username = data.username;
  let password = data.password;

  if (!username || !password){
    return response.badRequest();
  }
    
  let roleAccess = null;
  if (data.includeRoleAccess){
    roleAccess = data.includeRoleAccess;
  }
  const loginUser = makeLoginUser({
    userDb,
    userTokensDb,
    userRoleDb,
    routeRoleDb
  });
  return result = await loginUser(username, url, password, roleAccess,req,res);
};
module.exports = authentication;