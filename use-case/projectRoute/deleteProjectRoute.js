
/**
 *deleteProjectRoute.js
 */
 
const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');
const deleteProjectRoute = ({
  projectRouteDb,routeRoleDb
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
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
    const deleteWithDependency = makeDeleteWithDependency({
      projectRouteDb,
      routeRoleDb
    }); //dependency injection
    return await deleteWithDependency(query);
  }
};

module.exports = deleteProjectRoute;