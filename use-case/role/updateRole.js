/**
 *updateRole.js
 */

const  roleEntity = require('../../entities/role');
const response = require('../../utils/response');
const updateRole = ({
  roleDb, updateValidation
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;
  const validateRequest = await updateValidation(data);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let role = roleEntity(data);
  role = await roleDb.updateOne(query,role);
  if (role){
    return response.success({ data:role });
  }
  return response.recordNotFound();
};
module.exports = updateRole;