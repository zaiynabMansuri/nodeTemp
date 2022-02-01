
/**
 *bulkInsertUser.js
 */

const  userEntity = require('../../entities/user');
const response = require('../../utils/response');

const bulkInsertUser = ({
  userDb,createValidation 
}) => async (params,req = {},res = {}) => {
  let { data } = params;
  let userEntities = data.map(item => userEntity(item));
  let results = await userDb.createMany(userEntities);
  return response.success({ data:results });
};
module.exports = bulkInsertUser;