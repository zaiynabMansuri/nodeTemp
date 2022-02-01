/**
 * checkRolePermission.js
 * @description :: middleware that checks logged-in user's access of APIs
 */
const response = require('../utils/response');
const responseHandler = require('../utils/response/responseHandler');
const db = require('mongoose');

const checkRolePermission = ({
  userRoleDb, routeRoleDb,projectRouteDb
}) =>async (req, res, next) => {
  if (req.user) { 
    const loggedInUserId = req.user.id;
    let rolesOfUser = await userRoleDb.findMany({
      userId: loggedInUserId,
      isActive: true,
      isDeleted: false 
    }, {
      roleId: 1,
      _id: 0,
    });

    if (rolesOfUser && rolesOfUser.length) {
      rolesOfUser = rolesOfUser.map((role) => db.Types.ObjectId(role.roleId));
      const route = await projectRouteDb.findOne({
        route_name: replaceAll((req.route.path.toLowerCase()).substring(1), '/', '_'),
        uri: req.route.path.toLowerCase(),
      });

      if (route) { 
        const allowedRoute = await routeRoleDb.findMany({
          routeId: route._id,
          roleId: { $in: rolesOfUser },
          isActive: true,
          isDeleted: false,
        });
        if (allowedRoute && allowedRoute.length) {
          next();
        } else {
          return responseHandler(res, response.unAuthorized());
        }

      } else {
        next();
      }
    } else {
      next();
    } 
  } else {
    return responseHandler(res, response.unAuthorized());
  }
};

function replaceAll (string, search, replace) {
  return string.split(search).join(replace);
};

module.exports = checkRolePermission;