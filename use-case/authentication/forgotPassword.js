
const response = require('../../utils/response');
const responseStatus = require('../../utils/response/responseStatus');
const makeSendResetPasswordNotification = require('../common/sendResetPasswordNotification');

const forgotPassword = ({
  userDb,userAuthSettingsDb  
}) => async (params,req = {},res = {}) => {
  if (!params.email) {
    return response.validationError();
  }
  let where = { email: params.email };
  params.email = params.email.toString().toLowerCase();
  let user = await userDb.findOne(where);
  if (user) {
    let sendResetPasswordNotification = makeSendResetPasswordNotification({
      userDb,
      userAuthSettingsDb
    });
    let notificationResponse = await sendResetPasswordNotification(user);
    if (notificationResponse.status == responseStatus.success) {
      let {
        resultOfEmail, resultOfSMS
      } = notificationResponse.data;
      if (resultOfEmail && resultOfSMS) {
        return response.success({ message :'otp successfully send.' });
      } else if (resultOfEmail && !resultOfSMS) {
        return response.success({ message : 'otp successfully send to your email.' });
      } else if (!resultOfEmail && resultOfSMS) {
        return response.success({ message : 'otp successfully send to your mobile number.' });
      } else {
        return response.failure({ message :'otp can not be sent due to some issue try again later' });success;
      }
    } else {
      return response.failure();
    }
  } else {
    return response.recordNotFound();
  }
    
};
module.exports = forgotPassword;