/**
 *softDeleteManyRole.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeSoftDeleteWithDependency = require('./deleteDependent').softDeleteWithDependency;
const response = require('../../utils/response');
const softDeleteManyRole = ({
  roleDb,routeRoleDb,userRoleDb
}) => async (params,req = {},res = {}) => {
  let {
    data, query, dataToUpdate 
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
    const softDeleteWithDependency = makeSoftDeleteWithDependency({
      roleDb,
      routeRoleDb,
      userRoleDb
    }); //dependency injection
    return await softDeleteWithDependency(query, dataToUpdate);
  }
};
module.exports = softDeleteManyRole;
