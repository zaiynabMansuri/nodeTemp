/**
 *findAllMaster.js
 */

const response = require('../../utils/response');
const findAllMaster = ({
  MasterDb,filterValidation 
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
    result = await MasterDb.count(query);
    result = { totalRecords: result };
    return response.success({ data:result });  
  }
  else {
    result = await MasterDb.paginate(query,options);
    if (result){
      return response.success({ data:result });
    }
    return response.recordNotFound();
  }
};
module.exports = findAllMaster;