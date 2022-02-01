/**
 *softDeleteManyRouteRole.js
 */

const response = require('../../utils/response');
const softDeleteManyRouteRole = ({ routeRoleDb }) => async (params) => {
  let {
    dataToUpdate, query 
  } = params;
  let result = await routeRoleDb.softDeleteMany(query, dataToUpdate);
  if (result){
    return response.success({ data:result });
  }
  return response.recordNotFound();
};
module.exports = softDeleteManyRouteRole;
