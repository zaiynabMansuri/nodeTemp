/**
 *updateUser.js
 */

const  userEntity = require('../../entities/user');
const response = require('../../utils/response');
const updateUser = ({
  userDb, updateValidation
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;
  const validateRequest = await updateValidation(data);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let user = userEntity(data);
  user = await userDb.updateOne(query,user);
  if (user){
    return response.success({ data:user });
  }
  return response.recordNotFound();
};
module.exports = updateUser;