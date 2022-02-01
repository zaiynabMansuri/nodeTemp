/**
 *getRoleByAggregate.js
 */

const response = require('../../utils/response');
/**
 * @description : fetch data from database using aggregation pipelines
 * @param {obj} roleDb : db service instance
 * @param {obj} params : object of pipelines
 * @return {obj} : response of aggregate. {status, message, data}
 */

const getRoleByAggregate = ({ roleDb }) => async (params,req = {},res = {}) => {
    
  let { data } = params;
  let result = await roleDb.aggregate(data);
  if (result && result.length){
    return response.success({ data:result });
  }
  return response.recordNotFound();
};
module.exports = getRoleByAggregate;