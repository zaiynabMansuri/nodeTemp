/**
 *addRole.js
 */

const  roleEntity = require('../../entities/role');
const response = require('../../utils/response');
/**
 *
 * /**
 * @description : create documents of document of role in mongodb collection
 * @param {obj} roleDb : db service instance
 * @param {obj} params : {data: data to add}
 * @return {obj} : response of create. {status, message, data}
 */
const addRole = ({
  roleDb,createValidation 
}) => async (params,req = {},res = {}) => {
        
  let { data } = params;
  const validateRequest = await createValidation(data);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let role = roleEntity(data);
  role = await roleDb.create(role);
  return response.success({ data:role });
};
module.exports = addRole;