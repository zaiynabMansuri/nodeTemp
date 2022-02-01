/**
 *getPlanByAggregate.js
 */

const response = require('../../utils/response');
/**
 * @description : fetch data from database using aggregation pipelines
 * @param {obj} PlanDb : db service instance
 * @param {obj} params : object of pipelines
 * @return {obj} : response of aggregate. {status, message, data}
 */

const getPlanByAggregate = ({ PlanDb }) => async (params,req = {},res = {}) => {
    
  let { data } = params;
  let result = await PlanDb.aggregate(data);
  if (result && result.length){
    return response.success({ data:result });
  }
  return response.recordNotFound();
};
module.exports = getPlanByAggregate;