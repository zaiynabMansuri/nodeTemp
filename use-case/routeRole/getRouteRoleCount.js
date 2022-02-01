/**
 *getRouteRoleCount.js
 */

const response = require('../../utils/response');
/**
 * /**
 * @description : returns total number of documents of routeRole
 * @param {obj} routeRoleDb : db service instance
 * @param {obj} params : {where: query to find data}
 * @return {obj} : response of count. {status, message, data}
 */
const getRouteRoleCount = ({
  routeRoleDb,filterValidation 
}) => async (params,req = {},res = {}) => {
  let { where } = params;
  const validateRequest = await filterValidation(where);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }
  let result = await routeRoleDb.count(where);
  result = { totalRecords:result };
  return response.success({ data:result });
};
module.exports = getRouteRoleCount;