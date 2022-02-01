/**
 *bulkUpdateUserRole.js
 */

const response = require('../../utils/response');
/**
 * @description : update multiple records of userRole with data by filter.
 * @param {obj} userRoleDb : db service instance
 * @param {obj} params : {query: query to find data, data: data to update }
 * @return {obj} : response of bulkUpdate. {status, message, data}
 */
const bulkUpdateUserRole = ({ userRoleDb }) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;
  const results = await userRoleDb.updateMany(query,data);
  return response.success({ data:results });
};
module.exports = bulkUpdateUserRole;