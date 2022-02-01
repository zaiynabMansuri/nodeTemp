/**
 *deleteManyRouteRole.js
 */

const response = require('../../utils/response');
const deleteManyRouteRole = ({ routeRoleDb }) => async (params,req = {},res = {}) => {
  let { query } = params;
  let result = await routeRoleDb.deleteMany(query);
  return response.success({ data:result });
};
module.exports = deleteManyRouteRole;