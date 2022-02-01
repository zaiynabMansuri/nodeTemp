
/**
 *bulkInsertProjectRoute.js
 */

const  projectRouteEntity = require('../../entities/projectRoute');
const response = require('../../utils/response');

const bulkInsertProjectRoute = ({
  projectRouteDb,createValidation 
}) => async (params,req = {},res = {}) => {
  let { data } = params;
  let projectrouteEntities = data.map(item => projectRouteEntity(item));
  let results = await projectRouteDb.createMany(projectrouteEntities);
  return response.success({ data:results });
};
module.exports = bulkInsertProjectRoute;