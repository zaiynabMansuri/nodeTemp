/**
 *softDeleteUserRole.js
 */

const response = require('../../utils/response');

const softDeleteUserRole = ({ userRoleDb }) => async (params,req = {},res = {}) => {
  let {
    query, dataToUpdate 
  } = params;
  let result = await userRoleDb.softDelete(query, dataToUpdate);
  if (result){
    return response.success({ data:result });
  }
  return response.recordNotFound();
};
module.exports = softDeleteUserRole;