/**
 *softDeleteManyUserRole.js
 */

const response = require('../../utils/response');
const softDeleteManyUserRole = ({ userRoleDb }) => async (params) => {
  let {
    dataToUpdate, query 
  } = params;
  let result = await userRoleDb.softDeleteMany(query, dataToUpdate);
  if (result){
    return response.success({ data:result });
  }
  return response.recordNotFound();
};
module.exports = softDeleteManyUserRole;
