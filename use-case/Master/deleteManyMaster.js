/**
 *deleteManyMaster.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');
const deleteManyMaster = ({ MasterDb }) => async (params,req = {},res = {}) => {
  let {
    query,data 
  } = params;
  let result;
  if (data.isWarning){
    const getDependencyCount = makeGetDependencyCount({ MasterDb }); //dependency injection
    result = await getDependencyCount(query);
    return response.success({ data:result });
  } else {
    const deleteWithDependency = makeDeleteWithDependency({ MasterDb }); //dependency injection
    return await deleteWithDependency(query);
  }
};
module.exports = deleteManyMaster;