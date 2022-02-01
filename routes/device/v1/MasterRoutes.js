const express = require('express');
const router = express.Router();
const MasterController = require('../../../controller/device/v1/Master');
const adaptRequest = require('../../../helpers/adaptRequest');
const responseHandler = require('../../../utils/response/responseHandler');
const { auth } = require('../../../middleware');
const { checkRolePermission } = require('../../../middleware');

router.route('/device/api/v1/master/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.addMaster({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    responseHandler(res, result);
  });
});

router.route('/device/api/v1/master/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);    
  MasterController.findAllMaster({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/device/api/v1/master/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.getMasterCount(req.body).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/device/api/v1/master/aggregate').post(auth(...[ 'aggregateByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.getMasterByAggregate({ data:req.body }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/device/api/v1/master/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.softDeleteManyMaster(req.body,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/device/api/v1/master/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  MasterController.bulkInsertMaster({
    data: req.body,
    loggedInUser: req.user
  }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/device/api/v1/master/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.bulkUpdateMaster(req.body,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
}); 

router.route('/device/api/v1/master/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.deleteManyMaster(req.body,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/device/api/v1/master/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.softDeleteMaster(req.body,req.pathParams.id,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/device/api/v1/master/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.partialUpdateMaster(req.body,req.pathParams.id,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});   

router.route('/device/api/v1/master/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.updateMaster(req.body,req.pathParams.id,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});   

router.route('/device/api/v1/master/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.getMasterById({ _id: req.pathParams.id }).then((result)=>{
    responseHandler(res,result);
  });
});
router.route('/device/api/v1/master/:id').post(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.getMasterById({ _id: req.pathParams.id }, req.body).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/device/api/v1/master/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.deleteMaster(req.body,req.pathParams.id,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});

module.exports = router;
