const express = require('express');
const router = express.Router();
const routeRoleController = require('../../controller/admin/routeRole');
const adaptRequest = require('../../helpers/adaptRequest');
const responseHandler = require('../../utils/response/responseHandler');
const { auth } = require('../../middleware');
const { checkRolePermission } = require('../../middleware');

router.route('/admin/routerole/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  routeRoleController.addRouteRole({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    responseHandler(res, result);
  });
});

router.route('/admin/routerole/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  routeRoleController.bulkInsertRouteRole({
    data: req.body,
    loggedInUser: req.user
  }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/routerole/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);    
  routeRoleController.findAllRouteRole({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/routerole/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  routeRoleController.getRouteRoleCount(req.body).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/routerole/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  routeRoleController.bulkUpdateRouteRole(req.body,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
}); 

router.route('/admin/routerole/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  routeRoleController.softDeleteManyRouteRole(req.body,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/routerole/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  routeRoleController.deleteManyRouteRole(req.body,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/routerole/aggregate').post(auth(...[ 'aggregateByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  routeRoleController.getRouteRoleByAggregate({ data:req.body }).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/routerole/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  routeRoleController.softDeleteRouteRole(req.body,req.pathParams.id,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/routerole/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  routeRoleController.partialUpdateRouteRole(req.body,req.pathParams.id,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});   

router.route('/admin/routerole/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  routeRoleController.updateRouteRole(req.body,req.pathParams.id,req,res,req.user
  ).then((result)=>{
    responseHandler(res,result);
  });
});   

router.route('/admin/routerole/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  routeRoleController.getRouteRoleById({ _id: req.pathParams.id }).then((result)=>{
    responseHandler(res,result);
  });
});
router.route('/admin/routerole/:id').post(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  routeRoleController.getRouteRoleById({ _id: req.pathParams.id }, req.body).then((result)=>{
    responseHandler(res,result);
  });
});

router.route('/admin/routerole/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  routeRoleController.deleteRouteRole(req.body,req.pathParams.id,req,res,req.user).then((result)=>{
    responseHandler(res,result);
  });
});

module.exports = router;
