/**
 *partialUpdatePlan.js
 */

const  PlanEntity = require('../../entities/Plan');
const response = require('../../utils/response');
const partialUpdatePlan = ({
  PlanDb,updateValidation 
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;    
  const plan = await PlanDb.updateOne(query,data);
  if (plan){
    return response.success({ data:plan });
  }
  return response.recordNotFound();
};
module.exports = partialUpdatePlan;