
/**
 *bulkInsertPlan.js
 */

const  PlanEntity = require('../../entities/Plan');
const response = require('../../utils/response');

const bulkInsertPlan = ({
  PlanDb,createValidation 
}) => async (params,req = {},res = {}) => {
  let { data } = params;
  let planEntities = data.map(item => PlanEntity(item));
  let results = await PlanDb.createMany(planEntities);
  return response.success({ data:results });
};
module.exports = bulkInsertPlan;