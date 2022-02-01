/**
 *updateUserRole.js
 */

const  userRoleEntity = require('../../entities/userRole');
const response = require('../../utils/response');
const updateUserRole = ({
  userRoleDb, updateValidation
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;
  const validateRequest = await updateValidation(data);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let userrole = userRoleEntity(data);
  userrole = await userRoleDb.updateOne(query,userrole);
  if (userrole){
    return response.success({ data:userrole });
  }
  return response.recordNotFound();
};
module.exports = updateUserRole;