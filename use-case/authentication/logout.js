const response = require('../../utils/response');

const logout = ({ userTokensDb }) => async (user, token,req = {},res = {}) => {
  let userToken = await userTokensDb.findOne({
    token:token ,
    userId:user.id 
  });
  let updatedDocument = { isTokenExpired : true };
  await userTokensDb.updateOne( { _id:userToken.id },updatedDocument);
  return response.success({ message:'Logged out Successfully' });
};
module.exports = logout;