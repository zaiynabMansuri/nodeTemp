
/**
 *bulkInsertUserRole.js
 */

const  userRoleEntity = require('../../entities/userRole');
const response = require('../../utils/response');

const bulkInsertUserRole = ({
  userRoleDb,createValidation 
}) => async (params,req = {},res = {}) => {
  let { data } = params;
  let userroleEntities = data.map(item => userRoleEntity(item));
  let results = await userRoleDb.createMany(userroleEntities);
  return response.success({ data:results });
};
module.exports = bulkInsertUserRole;