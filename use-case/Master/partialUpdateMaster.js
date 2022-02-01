/**
 *partialUpdateMaster.js
 */

const  MasterEntity = require('../../entities/Master');
const response = require('../../utils/response');
const partialUpdateMaster = ({
  MasterDb,updateValidation 
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;    
  const master = await MasterDb.updateOne(query,data);
  if (master){
    return response.success({ data:master });
  }
  return response.recordNotFound();
};
module.exports = partialUpdateMaster;