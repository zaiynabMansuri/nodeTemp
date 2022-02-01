/**
 *bulkUpdatePlan.js
 */

const response = require('../../utils/response');
/**
 * @description : update multiple records of Plan with data by filter.
 * @param {obj} PlanDb : db service instance
 * @param {obj} params : {query: query to find data, data: data to update }
 * @return {obj} : response of bulkUpdate. {status, message, data}
 */
const bulkUpdatePlan = ({ PlanDb }) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;
  const results = await PlanDb.updateMany(query,data);
  return response.success({ data:results });
};
module.exports = bulkUpdatePlan;