/**
 *deleteManyUser.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');
const deleteManyUser = ({
  userDb,PlanDb,MasterDb,userTokensDb,userRoleDb
}) => async (params,req = {},res = {}) => {
  let {
    query,data 
  } = params;
  let result;
  if (data.isWarning){
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
module.exports = deleteManyUser;