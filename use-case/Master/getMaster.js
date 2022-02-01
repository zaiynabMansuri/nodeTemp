/**
 *getMaster.js
 */

const response = require('../../utils/response');

const getMaster = ({
  MasterDb, filterValidation 
}) => async (params,req = {},res = {}) => {
  let {
    query, options  
  } = params;
  const validateRequest = await filterValidation(options);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let result = await MasterDb.findOne(query, options);
  if (result){
    return response.success({ data:result });
  }
  return response.recordNotFound();
};
module.exports = getMaster;