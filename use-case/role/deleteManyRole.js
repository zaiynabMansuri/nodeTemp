/**
 *deleteManyRole.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');
const deleteManyRole = ({
  roleDb,routeRoleDb,userRoleDb
}) => async (params,req = {},res = {}) => {
  let {
    query,data 
  } = params;
  let result;
  if (data.isWarning){
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
module.exports = deleteManyRole;