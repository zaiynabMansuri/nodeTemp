/**
 *getUserRoleByAggregate.js
 */

const response = require('../../utils/response');
/**
 * @description : fetch data from database using aggregation pipelines
 * @param {obj} userRoleDb : db service instance
 * @param {obj} params : object of pipelines
 * @return {obj} : response of aggregate. {status, message, data}
 */

const getUserRoleByAggregate = ({ userRoleDb }) => async (params,req = {},res = {}) => {
    
  let { data } = params;
  let result = await userRoleDb.aggregate(data);
  if (result && result.length){
    return response.success({ data:result });
  }
  return response.recordNotFound();
};
module.exports = getUserRoleByAggregate;