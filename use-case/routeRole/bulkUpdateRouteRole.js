/**
 *bulkUpdateRouteRole.js
 */

const response = require('../../utils/response');
/**
 * @description : update multiple records of routeRole with data by filter.
 * @param {obj} routeRoleDb : db service instance
 * @param {obj} params : {query: query to find data, data: data to update }
 * @return {obj} : response of bulkUpdate. {status, message, data}
 */
const bulkUpdateRouteRole = ({ routeRoleDb }) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;
  const results = await routeRoleDb.updateMany(query,data);
  return response.success({ data:results });
};
module.exports = bulkUpdateRouteRole;