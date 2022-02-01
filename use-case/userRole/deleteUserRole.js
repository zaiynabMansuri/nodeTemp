
/**
 *deleteUserRole.js
 */
 
const response = require('../../utils/response');
const deleteUserRole = ({ userRoleDb }) => async (params,req = {},res = {}) => {
  let { query } = params;
  let result = await userRoleDb.deleteOne(query);
  return response.success({ data: result });
};

module.exports = deleteUserRole;