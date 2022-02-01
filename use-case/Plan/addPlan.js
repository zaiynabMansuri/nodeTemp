/**
 *addPlan.js
 */

const  PlanEntity = require('../../entities/Plan');
const response = require('../../utils/response');
/**
 *
 * /**
 * @description : create documents of document of Plan in mongodb collection
 * @param {obj} PlanDb : db service instance
 * @param {obj} params : {data: data to add}
 * @return {obj} : response of create. {status, message, data}
 */
const addPlan = ({
  PlanDb,createValidation 
}) => async (params,req = {},res = {}) => {
        
  let { data } = params;
  const validateRequest = await createValidation(data);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let Plan = PlanEntity(data);
  Plan = await PlanDb.create(Plan);
  return response.success({ data:Plan });
};
module.exports = addPlan;