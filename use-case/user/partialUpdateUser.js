/**
 *partialUpdateUser.js
 */

const  userEntity = require('../../entities/user');
const response = require('../../utils/response');
const partialUpdateUser = ({
  userDb,updateValidation 
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;    
  const user = await userDb.updateOne(query,data);
  if (user){
    return response.success({ data:user });
  }
  return response.recordNotFound();
};
module.exports = partialUpdateUser;