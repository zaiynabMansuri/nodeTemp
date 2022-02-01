/**
 *updateProjectRoute.js
 */

const  projectRouteEntity = require('../../entities/projectRoute');
const response = require('../../utils/response');
const updateProjectRoute = ({
  projectRouteDb, updateValidation
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;
  const validateRequest = await updateValidation(data);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let projectroute = projectRouteEntity(data);
  projectroute = await projectRouteDb.updateOne(query,projectroute);
  if (projectroute){
    return response.success({ data:projectroute });
  }
  return response.recordNotFound();
};
module.exports = updateProjectRoute;