/**
 *softDeleteRouteRole.js
 */

const response = require('../../utils/response');

const softDeleteRouteRole = ({ routeRoleDb }) => async (params,req = {},res = {}) => {
  let {
    query, dataToUpdate 
  } = params;
  let result = await routeRoleDb.softDelete(query, dataToUpdate);
  if (result){
    return response.success({ data:result });
  }
  return response.recordNotFound();
};
module.exports = softDeleteRouteRole;