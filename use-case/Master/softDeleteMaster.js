/**
 *softDeleteMaster.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeSoftDeleteWithDependency = require('./deleteDependent').softDeleteWithDependency;
const response = require('../../utils/response');

const softDeleteMaster = ({ MasterDb }) => async (params,req = {},res = {}) => {
  let {
    data, query, dataToUpdate 
  } = params;
  let result = {};
  if (data.isWarning) {
    const getDependencyCount = makeGetDependencyCount({ MasterDb }); //dependency injection
    result = await getDependencyCount(query);
    return response.success({ data:result });
  } else {
    const softDeleteWithDependency = makeSoftDeleteWithDependency({ MasterDb }); //dependency injection
    return await softDeleteWithDependency(query, dataToUpdate);
  }
};
module.exports = softDeleteMaster;