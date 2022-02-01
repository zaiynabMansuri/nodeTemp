/**
 *addRouteRole.js
 */

const  routeRoleEntity = require('../../entities/routeRole');
const response = require('../../utils/response');
/**
 *
 * /**
 * @description : create documents of document of routeRole in mongodb collection
 * @param {obj} routeRoleDb : db service instance
 * @param {obj} params : {data: data to add}
 * @return {obj} : response of create. {status, message, data}
 */
const addRouteRole = ({
  routeRoleDb,createValidation 
}) => async (params,req = {},res = {}) => {
        
  let { data } = params;
  const validateRequest = await createValidation(data);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let routeRole = routeRoleEntity(data);
  routeRole = await routeRoleDb.create(routeRole);
  return response.success({ data:routeRole });
};
module.exports = addRouteRole;