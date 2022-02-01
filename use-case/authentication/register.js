const  userEntity = require('../../entities/user');
const response = require('../../utils/response');
const responseStatus = require('../../utils/response/responseStatus');
const authConstant = require('../../constants/authConstant');
const sendPasswordBySMS = require('../common/sendPasswordBySMS'); 
const sendPasswordByEmail = require('../common/sendPasswordByEmail'); 

const register = ({ 
  userDb, 
  createValidation,
}) => async (data,req = {},res = {}) => {
  data.role = authConstant.USER_ROLE.User;
  let isEmptyPassword = false;
  if (!data.password){
    isEmptyPassword = true;
    data.password = Math.random().toString(36).slice(2);
  }

  let validateSchema = await createValidation(data);
  if (!validateSchema.isValid) {
    return response.validationError({ message: validateSchema.message });
  }

  let newUser = userEntity(data);

  let checkUniqueValidation = checkUnique({ userDb }); //dependance injection
  let unique = await checkUniqueValidation(data);    
    
  if (unique.status != responseStatus.success ){
    return response.badRequest({ message : 'User Registration Failed, Duplicate data found' });
  }
  const result = await userDb.create(newUser);
  if (isEmptyPassword && data.mobileNo){
    await sendPasswordBySMS({
      mobileNo: data.mobileNo,
      password: data.password
    });
  }
  if (isEmptyPassword && data.email){
    await sendPasswordByEmail({
      email: data.email,
      password: data.password
    });
  }
  return response.success({ data :result });
    
};

const checkUnique = ({ userDb }) => async (data) =>{
  let filter = { $or:[] };
  if (data && data['username']){
    filter['$or'].push(
      { 'username':data['username'] },
      { 'email':data['username'] },
    );
  }
  if (data && data['email']){
    filter['$or'].push(
      { 'username':data['email'] },
      { 'email':data['email'] },
    );
  }
  let found = await userDb.findOne(filter);
  if (found){
    return response.failure();
  }
  return response.success();
};

module.exports = register;