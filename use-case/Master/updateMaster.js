/**
 *updateMaster.js
 */

const  MasterEntity = require('../../entities/Master');
const response = require('../../utils/response');
const updateMaster = ({
  MasterDb, updateValidation
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;
  const validateRequest = await updateValidation(data);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let master = MasterEntity(data);
  master = await MasterDb.updateOne(query,master);
  if (master){
    return response.success({ data:master });
  }
  return response.recordNotFound();
};
module.exports = updateMaster;