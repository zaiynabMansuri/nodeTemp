/**
 *partialUpdateRouteRole.js
 */

const  routeRoleEntity = require('../../entities/routeRole');
const response = require('../../utils/response');
const partialUpdateRouteRole = ({
  routeRoleDb,updateValidation 
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;    
  const routerole = await routeRoleDb.updateOne(query,data);
  if (routerole){
    return response.success({ data:routerole });
  }
  return response.recordNotFound();
};
module.exports = partialUpdateRouteRole;