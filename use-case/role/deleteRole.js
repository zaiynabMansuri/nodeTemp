
/**
 *deleteRole.js
 */
 
const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');
const deleteRole = ({
  roleDb,routeRoleDb,userRoleDb
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;
  let result = {};
  if (data.isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      roleDb,
      routeRoleDb,
      userRoleDb
    }); //dependency injection
    result = await getDependencyCount(query);
    return response.success({ data:result });
  } else {
    const deleteWithDependency = makeDeleteWithDependency({
      roleDb,
      routeRoleDb,
      userRoleDb
    }); //dependency injection
    return await deleteWithDependency(query);
  }
};

module.exports = deleteRole;