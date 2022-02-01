const response = require('../../utils/response');

const getDependencyCount = ({ MasterDb })=> async (filter) =>{
  let Master = await MasterDb.findMany(filter, { _id:1 });
  if (Master.length){
    let MasterIds = Master.map((obj) => obj._id);

    const MasterFilter = { '$or': [{ parentId : { '$in' : MasterIds } }] };
    const MasterCnt =  await MasterDb.count(MasterFilter);
    let response = { Master : MasterCnt, };
    return response;
  } else {
    return {  Master : 0 };
  }
};

const deleteWithDependency = ({ MasterDb })=> async (filter) =>{
  let Master = await MasterDb.findMany(filter, { _id:1 });
  if (Master.length){
    let MasterIds = Master.map((obj) => obj._id);

    const MasterFilter = { '$or': [{ parentId : { '$in' : MasterIds } }] };
    await MasterDb.deleteMany(MasterFilter);

    let result = await MasterDb.deleteMany(filter);
    return response.success({ data :result });
  } else {
    return response.badRequest({ message :'No Master found.' });
  }
};

const softDeleteWithDependency = ({ MasterDb }) => async (filter,updateBody) =>{
  let Master = await MasterDb.findMany(filter, { _id:1 });
  if (Master.length){
    let MasterIds = Master.map((obj) => obj._id);

    const MasterFilter = { '$or': [{ parentId : { '$in' : MasterIds } }] };
    await MasterDb.updateMany(MasterFilter,updateBody);

    let result = await MasterDb.updateMany(filter,updateBody);
    return response.success({ data : result });
  } else {
    return response.badRequest({ message : 'No Master found.' });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
