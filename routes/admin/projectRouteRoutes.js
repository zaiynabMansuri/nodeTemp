const express = require('express');
const router = express.Router();
const projectRouteController = require('../../controller/admin/projectRoute');
const adaptRequest = require('../../helpers/adaptRequest');
const responseHandler = require('../../utils/response/responseHandler');
const { auth } = require('../../middleware');
const { checkRolePermission } = require('../../middleware');

router.route('/admin/projectroute/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  projectRouteController.addProjectRoute({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    responseHandler(res, result);
  });
});

router.route('/admin/projectroute/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  projectRouteController.bulkInsertProjectRoute({
    data: req.body,
    loggedInUser: req.user
  }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/projectroute/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);    
  projectRouteController.findAllProjectRoute({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/projectroute/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  projectRouteController.getProjectRouteCount(req.body).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/projectroute/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  projectRouteController.bulkUpdateProjectRoute(req.body,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
}); 

router.route('/admin/projectroute/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  projectRouteController.softDeleteManyProjectRoute(req.body,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/projectroute/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  projectRouteController.deleteManyProjectRoute(req.body,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/projectroute/aggregate').post(auth(...[ 'aggregateByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  projectRouteController.getProjectRouteByAggregate({ data:req.body }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/projectroute/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  projectRouteController.softDeleteProjectRoute(req.body,req.pathParams.id,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/projectroute/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  projectRouteController.partialUpdateProjectRoute(req.body,req.pathParams.id,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});   

router.route('/admin/projectroute/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  projectRouteController.updateProjectRoute(req.body,req.pathParams.id,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});   

router.route('/admin/projectroute/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  projectRouteController.getProjectRouteById({ _id: req.pathParams.id }).then((result)=>{
    responseHandler(res,result);
  });
});
router.route('/admin/projectroute/:id').post(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  projectRouteController.getProjectRouteById({ _id: req.pathParams.id }, req.body).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/projectroute/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  projectRouteController.deleteProjectRoute(req.body,req.pathParams.id,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});

module.exports = router;
