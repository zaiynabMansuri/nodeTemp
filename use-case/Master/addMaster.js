/**
 *addMaster.js
 */

const  MasterEntity = require('../../entities/Master');
const response = require('../../utils/response');
/**
 *
 * /**
 * @description : create documents of document of Master in mongodb collection
 * @param {obj} MasterDb : db service instance
 * @param {obj} params : {data: data to add}
 * @return {obj} : response of create. {status, message, data}
 */
const addMaster = ({
  MasterDb,createValidation 
}) => async (params,req = {},res = {}) => {
        
  let { data } = params;
  const validateRequest = await createValidation(data);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let Master = MasterEntity(data);
  Master = await MasterDb.create(Master);
  return response.success({ data:Master });
};
module.exports = addMaster;