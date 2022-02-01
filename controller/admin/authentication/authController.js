const dayjs = require('dayjs');
const authConstant = require('../../../constants/authConstant');
const response = require('../../../utils/response');  
const register = (registerUsecase) => async (data,req = {},res = {}) => {
  try {
    return await registerUsecase(data,req,res);
  } catch (error) {
    return response.internalServerError();
  }
};
const forgotPassword = (forgotPasswordUsecase) => async (data,req = {},res = {}) => {
  try {
    return await forgotPasswordUsecase(data,req,res);
  } catch (error) {
    return response.internalServerError();
  }
};

const validateResetPasswordOtp = (validateResetPasswordOtpUsecase) => async (data,req = {},res = {}) => {
  try {
    return await validateResetPasswordOtpUsecase(data,req,res);
  } catch (error) {
    return response.internalServerError();
  }
};

const resetPassword = (resetPasswordUsecase) => async (data,req = {},res = {}) => {
  try {
    return await resetPasswordUsecase(data,req,res);
  } catch (error) {
    return response.internalServerError();
  }
};

const authentication = (authenticationUsecase) => async (data, url,req = {},res = {})=>{
  try {
    return await authenticationUsecase(data, url,req,res);
  } catch (error) {
    return response.internalServerError();
  }
};

const logout = (logoutUsecase) => async (user, token,req = {},res = {}) => {
  try {
    token = token.replace('Bearer ', '');
    return await logoutUsecase(user, token,req,res);
  } catch (error) {
    return response.internalServerError();
  }
};

module.exports = Object.freeze({
  register,
  authentication,
  forgotPassword,
  resetPassword,
  validateResetPasswordOtp,
  logout
});
