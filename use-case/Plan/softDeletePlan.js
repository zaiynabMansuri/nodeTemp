/**
 *softDeletePlan.js
 */

const response = require('../../utils/response');

const softDeletePlan = ({ PlanDb }) => async (params,req = {},res = {}) => {
  let {
    query, dataToUpdate 
  } = params;
  let result = await PlanDb.softDelete(query, dataToUpdate);
  if (result){
    return response.success({ data:result });
  }
  return response.recordNotFound();
};
module.exports = softDeletePlan;