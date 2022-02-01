
/**
 *bulkInsertRouteRole.js
 */

const  routeRoleEntity = require('../../entities/routeRole');
const response = require('../../utils/response');

const bulkInsertRouteRole = ({
  routeRoleDb,createValidation 
}) => async (params,req = {},res = {}) => {
  let { data } = params;
  let routeroleEntities = data.map(item => routeRoleEntity(item));
  let results = await routeRoleDb.createMany(routeroleEntities);
  return response.success({ data:results });
};
module.exports = bulkInsertRouteRole;