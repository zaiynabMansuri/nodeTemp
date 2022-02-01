/**
 *partialUpdateProjectRoute.js
 */

const  projectRouteEntity = require('../../entities/projectRoute');
const response = require('../../utils/response');
const partialUpdateProjectRoute = ({
  projectRouteDb,updateValidation 
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;    
  const projectroute = await projectRouteDb.updateOne(query,data);
  if (projectroute){
    return response.success({ data:projectroute });
  }
  return response.recordNotFound();
};
module.exports = partialUpdateProjectRoute;