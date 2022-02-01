const response = require('../../utils/response');

const getDependencyCount = ({
  userDb,userTokensDb,userRoleDb
})=> async (filter) =>{
  let user = await userDb.findMany(filter, { _id:1 });
  if (user.length){
    let userIds = user.map((obj) => obj._id);

    const userFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userCnt =  await userDb.count(userFilter);

    const userTokensFilter = { '$or': [{ userId : { '$in' : userIds } }] };
    const userTokensCnt =  await userTokensDb.count(userTokensFilter);

    const userRoleFilter = { '$or': [{ userId : { '$in' : userIds } }] };
    const userRoleCnt =  await userRoleDb.count(userRoleFilter);
    let response = {
      user : userCnt,
      userTokens : userTokensCnt,
      userRole : userRoleCnt,
    };
    return response;
  } else {
    return {  user : 0 };
  }
};

const deleteWithDependency = ({
  userDb,userTokensDb,userRoleDb
})=> async (filter) =>{
  let user = await userDb.findMany(filter, { _id:1 });
  if (user.length){
    let userIds = user.map((obj) => obj._id);

    const userFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    await userDb.deleteMany(userFilter);

    const userTokensFilter = { '$or': [{ userId : { '$in' : userIds } }] };
    await userTokensDb.deleteMany(userTokensFilter);

    const userRoleFilter = { '$or': [{ userId : { '$in' : userIds } }] };
    await userRoleDb.deleteMany(userRoleFilter);

    let result = await userDb.deleteMany(filter);
    return response.success({ data :result });
  } else {
    return response.badRequest({ message :'No user found.' });
  }
};

const softDeleteWithDependency = ({
  userDb,userTokensDb,userRoleDb
}) => async (filter,updateBody) =>{
  let user = await userDb.findMany(filter, { _id:1 });
  if (user.length){
    let userIds = user.map((obj) => obj._id);

    const userFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    await userDb.updateMany(userFilter,updateBody);

    const userTokensFilter = { '$or': [{ userId : { '$in' : userIds } }] };
    await userTokensDb.updateMany(userTokensFilter,updateBody);

    const userRoleFilter = { '$or': [{ userId : { '$in' : userIds } }] };
    await userRoleDb.updateMany(userRoleFilter,updateBody);

    let result = await userDb.updateMany(filter,updateBody);
    return response.success({ data : result });
  } else {
    return response.badRequest({ message : 'No user found.' });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
