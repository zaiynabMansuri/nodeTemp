/**
 *bulkUpdateRole.js
 */

const response = require('../../utils/response');
/**
 * @description : update multiple records of role with data by filter.
 * @param {obj} roleDb : db service instance
 * @param {obj} params : {query: query to find data, data: data to update }
 * @return {obj} : response of bulkUpdate. {status, message, data}
 */
const bulkUpdateRole = ({ roleDb }) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;
  const results = await roleDb.updateMany(query,data);
  return response.success({ data:results });
};
module.exports = bulkUpdateRole;