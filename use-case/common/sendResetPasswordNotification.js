const dayjs = require('dayjs');
const uuid = require('uuid').v4;
const { FORGOT_PASSWORD_WITH } = require('../../constants/authConstant');
const response = require('../../utils/response');

const { sendMail } = require('../../services/email/emailService');
const { sendSMS } = require('../../services/sms/smsService');
const generateRandomNumber = require('../../utils/generateRandomNumber');

const sendResetPasswordNotification = ({ userDb }) => async (user,req = {},res = {}) => {
  let resultOfEmail = false;
  let resultOfSMS = false;
  let token = uuid();
  let expires = dayjs();
  expires = expires.add(FORGOT_PASSWORD_WITH.EXPIRETIME, 'minute').toISOString();
  await userDb.updateOne({ _id :user.id }, {
    resetPasswordLink: {
      code: token,
      expireTime: expires 
    } 
  });
  if (FORGOT_PASSWORD_WITH.LINK.email){

    let mailObj = {
      subject: 'Reset Password',
      to: user.email,
    };
    let viewType = '/reset-password/';
    let msg = 'Click on the link below to reset your password.';
    mailObj.template = '/views/resetPassword';
    mailObj.data = {
      link: `http://localhost:${process.env.PORT}` + viewType + token,
      linkText: 'Reset Password',
      message:msg
    };
    try {
      await sendMail(mailObj);
      resultOfEmail = true;
    } catch (error) {
      console.log(error);
    }
  }
  if (FORGOT_PASSWORD_WITH.LINK.sms){
    let viewType = '/reset-password/';
    let msg = `Click on the link to reset your password. http://localhost:${process.env.PORT}${viewType + token}`;
    let smsObj = {
      to:user.mobileNo,
      message:msg
    };
    try {
      await sendSMS(smsObj);
      resultOfSMS = true;
    } catch (error){
      console.log(error);
    }
  }
  return response.success({
    data :{
      resultOfEmail,
      resultOfSMS 
    } 
  });
};
module.exports = sendResetPasswordNotification;