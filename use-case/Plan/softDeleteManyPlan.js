/**
 *softDeleteManyPlan.js
 */

const response = require('../../utils/response');
const softDeleteManyPlan = ({ PlanDb }) => async (params) => {
  let {
    dataToUpdate, query 
  } = params;
  let result = await PlanDb.softDeleteMany(query, dataToUpdate);
  if (result){
    return response.success({ data:result });
  }
  return response.recordNotFound();
};
module.exports = softDeleteManyPlan;
