
/**
 *deleteRouteRole.js
 */
 
const response = require('../../utils/response');
const deleteRouteRole = ({ routeRoleDb }) => async (params,req = {},res = {}) => {
  let { query } = params;
  let result = await routeRoleDb.deleteOne(query);
  return response.success({ data: result });
};

module.exports = deleteRouteRole;