/**
 *updatePlan.js
 */

const  PlanEntity = require('../../entities/Plan');
const response = require('../../utils/response');
const updatePlan = ({
  PlanDb, updateValidation
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;
  const validateRequest = await updateValidation(data);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let plan = PlanEntity(data);
  plan = await PlanDb.updateOne(query,plan);
  if (plan){
    return response.success({ data:plan });
  }
  return response.recordNotFound();
};
module.exports = updatePlan;