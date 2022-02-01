/**
 *partialUpdateRole.js
 */

const  roleEntity = require('../../entities/role');
const response = require('../../utils/response');
const partialUpdateRole = ({
  roleDb,updateValidation 
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;    
  const role = await roleDb.updateOne(query,data);
  if (role){
    return response.success({ data:role });
  }
  return response.recordNotFound();
};
module.exports = partialUpdateRole;