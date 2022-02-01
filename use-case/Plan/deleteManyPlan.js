/**
 *deleteManyPlan.js
 */

const response = require('../../utils/response');
const deleteManyPlan = ({ PlanDb }) => async (params,req = {},res = {}) => {
  let { query } = params;
  let result = await PlanDb.deleteMany(query);
  return response.success({ data:result });
};
module.exports = deleteManyPlan;