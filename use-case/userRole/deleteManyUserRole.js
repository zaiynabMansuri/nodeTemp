/**
 *deleteManyUserRole.js
 */

const response = require('../../utils/response');
const deleteManyUserRole = ({ userRoleDb }) => async (params,req = {},res = {}) => {
  let { query } = params;
  let result = await userRoleDb.deleteMany(query);
  return response.success({ data:result });
};
module.exports = deleteManyUserRole;