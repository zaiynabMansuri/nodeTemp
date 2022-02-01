/**
 *getPlanCount.js
 */

const response = require('../../utils/response');
/**
 * /**
 * @description : returns total number of documents of Plan
 * @param {obj} PlanDb : db service instance
 * @param {obj} params : {where: query to find data}
 * @return {obj} : response of count. {status, message, data}
 */
const getPlanCount = ({
  PlanDb,filterValidation 
}) => async (params,req = {},res = {}) => {
  let { where } = params;
  const validateRequest = await filterValidation(where);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }
  let result = await PlanDb.count(where);
  result = { totalRecords:result };
  return response.success({ data:result });
};
module.exports = getPlanCount;