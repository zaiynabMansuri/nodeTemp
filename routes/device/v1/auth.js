const express = require('express');
const router = express.Router();
const adaptRequest = require('../../../helpers/adaptRequest');
const responseHandler = require('../../../utils/response/responseHandler');
const { auth } = require('../../../middleware');
const authController = require('../../../controller/device/v1/authentication');

router.post('/register',(req,res,next)=>{
  req = adaptRequest(req);
  authController.register(req.body).then((result)=>{
    responseHandler(res,result);
  });
});
router.post('/login',(req,res,next)=>{
  req = adaptRequest(req);
  authController.authentication(req.body,req.url).then((result) => {
    responseHandler(res,result);
  });
});

router.post('/forgot-password', (req, res, next) => {
  req = adaptRequest(req);
  authController.forgotPassword(req.body).then((result) => {
    responseHandler(res, result);
  });
});

router.post('/validate-otp',(req,res,next)=>{
  req = adaptRequest(req);
  authController.validateResetPasswordOtp(req.body).then((result) => {
    responseHandler(res, result);
  });
});

router.put('/reset-password',(req,res,next)=>{
  req = adaptRequest(req);
  authController.resetPassword(req.body).then((result) => {
    responseHandler(res, result);
  });
});

router.post('/logout',auth(...[ 'logoutByUserInDevicePlatform', 'logoutByAdminInDevicePlatform' ]),(req,res,next)=>{
  req = adaptRequest(req);
  authController.logout(req.user,req.headers.authorization).then((result) => {
    responseHandler(res, result);
  });
});

module.exports = router;
