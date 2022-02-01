/**
 *addUserRole.js
 */

const  userRoleEntity = require('../../entities/userRole');
const response = require('../../utils/response');
/**
 *
 * /**
 * @description : create documents of document of userRole in mongodb collection
 * @param {obj} userRoleDb : db service instance
 * @param {obj} params : {data: data to add}
 * @return {obj} : response of create. {status, message, data}
 */
const addUserRole = ({
  userRoleDb,createValidation 
}) => async (params,req = {},res = {}) => {
        
  let { data } = params;
  const validateRequest = await createValidation(data);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let userRole = userRoleEntity(data);
  userRole = await userRoleDb.create(userRole);
  return response.success({ data:userRole });
};
module.exports = addUserRole;