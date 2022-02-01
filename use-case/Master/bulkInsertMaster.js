
/**
 *bulkInsertMaster.js
 */

const  MasterEntity = require('../../entities/Master');
const response = require('../../utils/response');

const bulkInsertMaster = ({
  MasterDb,createValidation 
}) => async (params,req = {},res = {}) => {
  let { data } = params;
  let masterEntities = data.map(item => MasterEntity(item));
  let results = await MasterDb.createMany(masterEntities);
  return response.success({ data:results });
};
module.exports = bulkInsertMaster;