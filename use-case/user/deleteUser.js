
/**
 *deleteUser.js
 */
 
const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');
const deleteUser = ({
  userDb,PlanDb,MasterDb,userTokensDb,userRoleDb
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
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
    const deleteWithDependency = makeDeleteWithDependency({
      userDb,
      PlanDb,
      MasterDb,
      userTokensDb,
      userRoleDb
    }); //dependency injection
    return await deleteWithDependency(query);
  }
};

module.exports = deleteUser;