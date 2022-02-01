
/**
 *bulkInsertRole.js
 */

const  roleEntity = require('../../entities/role');
const response = require('../../utils/response');

const bulkInsertRole = ({
  roleDb,createValidation 
}) => async (params,req = {},res = {}) => {
  let { data } = params;
  let roleEntities = data.map(item => roleEntity(item));
  let results = await roleDb.createMany(roleEntities);
  return response.success({ data:results });
};
module.exports = bulkInsertRole;