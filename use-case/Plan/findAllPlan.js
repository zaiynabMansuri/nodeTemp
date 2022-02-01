/**
 *findAllPlan.js
 */

const response = require('../../utils/response');
const findAllPlan = ({
  PlanDb,filterValidation 
}) => async (params,req = {},res = {}) => {
  const validateRequest = await filterValidation(params.data);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }
  let {
    data, query, options 
  } = params;
  let result;
  if (data.isCountOnly){
    result = await PlanDb.count(query);
    result = { totalRecords: result };
    return response.success({ data:result });  
  }
  else {
    result = await PlanDb.paginate(query,options);
    if (result){
      return response.success({ data:result });
    }
    return response.recordNotFound();
  }
};
module.exports = findAllPlan;