
/**
 *deletePlan.js
 */
 
const response = require('../../utils/response');
const deletePlan = ({ PlanDb }) => async (params,req = {},res = {}) => {
  let { query } = params;
  let result = await PlanDb.deleteOne(query);
  return response.success({ data: result });
};

module.exports = deletePlan;