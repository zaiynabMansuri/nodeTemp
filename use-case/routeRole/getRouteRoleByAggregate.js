/**
 *getRouteRoleByAggregate.js
 */

const response = require('../../utils/response');
/**
 * @description : fetch data from database using aggregation pipelines
 * @param {obj} routeRoleDb : db service instance
 * @param {obj} params : object of pipelines
 * @return {obj} : response of aggregate. {status, message, data}
 */

const getRouteRoleByAggregate = ({ routeRoleDb }) => async (params,req = {},res = {}) => {
    
  let { data } = params;
  let result = await routeRoleDb.aggregate(data);
  if (result && result.length){
    return response.success({ data:result });
  }
  return response.recordNotFound();
};
module.exports = getRouteRoleByAggregate;