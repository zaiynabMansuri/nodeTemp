const express = require('express');
const router = express.Router();
const MasterController = require('../../controller/admin/Master');
const adaptRequest = require('../../helpers/adaptRequest');
const responseHandler = require('../../utils/response/responseHandler');
const { auth } = require('../../middleware');
const { checkRolePermission } = require('../../middleware');

router.route('/admin/master/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.addMaster({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    responseHandler(res, result);
  });
});

router.route('/admin/master/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);    
  MasterController.findAllMaster({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/master/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.getMasterCount(req.body).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/master/aggregate').post(auth(...[ 'aggregateByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.getMasterByAggregate({ data:req.body }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/master/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.softDeleteManyMaster(req.body,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/master/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  MasterController.bulkInsertMaster({
    data: req.body,
    loggedInUser: req.user
  }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/master/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.bulkUpdateMaster(req.body,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
}); 

router.route('/admin/master/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.deleteManyMaster(req.body,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/master/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.softDeleteMaster(req.body,req.pathParams.id,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/master/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.partialUpdateMaster(req.body,req.pathParams.id,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});   

router.route('/admin/master/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.updateMaster(req.body,req.pathParams.id,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});   

router.route('/admin/master/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.getMasterById({ _id: req.pathParams.id }).then((result)=>{
    responseHandler(res,result);
  });
});
router.route('/admin/master/:id').post(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.getMasterById({ _id: req.pathParams.id }, req.body).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/master/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  MasterController.deleteMaster(req.body,req.pathParams.id,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});

module.exports = router;
