/**
 *partialUpdateUserRole.js
 */

const  userRoleEntity = require('../../entities/userRole');
const response = require('../../utils/response');
const partialUpdateUserRole = ({
  userRoleDb,updateValidation 
}) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;    
  const userrole = await userRoleDb.updateOne(query,data);
  if (userrole){
    return response.success({ data:userrole });
  }
  return response.recordNotFound();
};
module.exports = partialUpdateUserRole;