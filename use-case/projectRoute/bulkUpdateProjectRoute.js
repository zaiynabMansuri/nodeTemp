/**
 *bulkUpdateProjectRoute.js
 */

const response = require('../../utils/response');
/**
 * @description : update multiple records of projectRoute with data by filter.
 * @param {obj} projectRouteDb : db service instance
 * @param {obj} params : {query: query to find data, data: data to update }
 * @return {obj} : response of bulkUpdate. {status, message, data}
 */
const bulkUpdateProjectRoute = ({ projectRouteDb }) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;
  const results = await projectRouteDb.updateMany(query,data);
  return response.success({ data:results });
};
module.exports = bulkUpdateProjectRoute;