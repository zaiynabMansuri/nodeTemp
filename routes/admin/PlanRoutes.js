const express = require('express');
const router = express.Router();
const PlanController = require('../../controller/admin/Plan');
const adaptRequest = require('../../helpers/adaptRequest');
const responseHandler = require('../../utils/response/responseHandler');
const { auth } = require('../../middleware');
const { checkRolePermission } = require('../../middleware');

router.route('/admin/plan/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  PlanController.addPlan({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    responseHandler(res, result);
  });
});

router.route('/admin/plan/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);    
  PlanController.findAllPlan({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/plan/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  PlanController.getPlanCount(req.body).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/plan/aggregate').post(auth(...[ 'aggregateByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  PlanController.getPlanByAggregate({ data:req.body }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/plan/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  PlanController.softDeleteManyPlan(req.body,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/plan/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  PlanController.bulkInsertPlan({
    data: req.body,
    loggedInUser: req.user
  }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/plan/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  PlanController.bulkUpdatePlan(req.body,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
}); 

router.route('/admin/plan/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  PlanController.deleteManyPlan(req.body,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/plan/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  PlanController.softDeletePlan(req.body,req.pathParams.id,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/plan/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  PlanController.partialUpdatePlan(req.body,req.pathParams.id,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});   

router.route('/admin/plan/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  PlanController.updatePlan(req.body,req.pathParams.id,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});   

router.route('/admin/plan/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  PlanController.getPlanById({ _id: req.pathParams.id }).then((result)=>{
    responseHandler(res,result);
  });
});
router.route('/admin/plan/:id').post(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  PlanController.getPlanById({ _id: req.pathParams.id }, req.body).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/plan/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  PlanController.deletePlan(req.body,req.pathParams.id,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});

module.exports = router;
