/**
 *softDeleteProjectRoute.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeSoftDeleteWithDependency = require('./deleteDependent').softDeleteWithDependency;
const response = require('../../utils/response');

const softDeleteProjectRoute = ({
  projectRouteDb,routeRoleDb
}) => async (params,req = {},res = {}) => {
  let {
    data, query, dataToUpdate 
  } = params;
  let result = {};
  if (data.isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      projectRouteDb,
      routeRoleDb
    }); //dependency injection
    result = await getDependencyCount(query);
    return response.success({ data:result });
  } else {
    const softDeleteWithDependency = makeSoftDeleteWithDependency({
      projectRouteDb,
      routeRoleDb
    }); //dependency injection
    return await softDeleteWithDependency(query, dataToUpdate);
  }
};
module.exports = softDeleteProjectRoute;