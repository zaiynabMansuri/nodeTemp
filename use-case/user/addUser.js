/**
 *addUser.js
 */

const  userEntity = require('../../entities/user');
const response = require('../../utils/response');
/**
 *
 * /**
 * @description : create documents of document of user in mongodb collection
 * @param {obj} userDb : db service instance
 * @param {obj} params : {data: data to add}
 * @return {obj} : response of create. {status, message, data}
 */
const addUser = ({
  userDb,createValidation 
}) => async (params,req = {},res = {}) => {
        
  let { data } = params;
  const validateRequest = await createValidation(data);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let user = userEntity(data);
  user = await userDb.create(user);
  return response.success({ data:user });
};
module.exports = addUser;