/**
 *addProjectRoute.js
 */

const  projectRouteEntity = require('../../entities/projectRoute');
const response = require('../../utils/response');
/**
 *
 * /**
 * @description : create documents of document of projectRoute in mongodb collection
 * @param {obj} projectRouteDb : db service instance
 * @param {obj} params : {data: data to add}
 * @return {obj} : response of create. {status, message, data}
 */
const addProjectRoute = ({
  projectRouteDb,createValidation 
}) => async (params,req = {},res = {}) => {
        
  let { data } = params;
  const validateRequest = await createValidation(data);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let projectRoute = projectRouteEntity(data);
  projectRoute = await projectRouteDb.create(projectRoute);
  return response.success({ data:projectRoute });
};
module.exports = addProjectRoute;