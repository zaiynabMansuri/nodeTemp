/**
 *softDeleteUser.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeSoftDeleteWithDependency = require('./deleteDependent').softDeleteWithDependency;
const response = require('../../utils/response');

const softDeleteUser = ({
  userDb,PlanDb,MasterDb,userTokensDb,userRoleDb
}) => async (params,req = {},res = {}) => {
  let {
    data, query, dataToUpdate 
  } = params;
  let result = {};
  if (data.isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      userDb,
      PlanDb,
      MasterDb,
      userTokensDb,
      userRoleDb
    }); //dependency injection
    result = await getDependencyCount(query);
    return response.success({ data:result });
  } else {
    const softDeleteWithDependency = makeSoftDeleteWithDependency({
      userDb,
      PlanDb,
      MasterDb,
      userTokensDb,
      userRoleDb
    }); //dependency injection
    return await softDeleteWithDependency(query, dataToUpdate);
  }
};
module.exports = softDeleteUser;