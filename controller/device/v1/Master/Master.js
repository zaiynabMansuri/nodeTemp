const response = require('../../../../utils/response'); 
const getSelectObject = require('../../../../utils/getSelectObject'); 

const addMaster = (addMasterUsecase) => async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    data.addedBy = loggedInUser.id.toString();
    let result = await addMasterUsecase({ data },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const findAllMaster = (findAllMasterUsecase) => async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    let query = data.query ? data.query : {};
    let options = data.options ? data.options : {};
    return await findAllMasterUsecase({
      data,
      query,
      options
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const getMasterCount = (getMasterCountUsecase) => async (data,req = {},res = {}) => {
  try {
    let where = data && data.where ? data.where : {};
    return await getMasterCountUsecase({ where },req,res);  
  } catch (error){
    return response.internalServerError();
  }
};

const getMasterByAggregate = (getMasterByAggregateUsecase)=> async ({ data },req = {},res = {}) =>{
  try {
    return await getMasterByAggregateUsecase({ data },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const softDeleteManyMaster = (softDeleteManyMasterUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    let ids = data.ids;
    const query = { '_id':{ '$in':ids } };

    const dataToUpdate = { isDeleted: true, };
    return await softDeleteManyMasterUsecase({
      data,
      query,
      dataToUpdate
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const bulkInsertMaster = (bulkInsertMasterUsecase)=> async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    data = data.data;
    for (let i = 0;i < data.length;i++){
      data[i] = {
        ...data[i],
        addedBy:loggedInUser.id.toString(),
      };
    }
    let result = await bulkInsertMasterUsecase({ data },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const bulkUpdateMaster = (bulkUpdateMasterUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    delete data.data.addedBy;
    delete data.data.updatedBy;
    data.data.updatedBy = loggedInUser.id;
    let query = data.filter;
    return await bulkUpdateMasterUsecase({
      data: data.data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const deleteManyMaster = (deleteManyMasterUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    let ids = data.ids;
    const query = { '_id':{ '$in':ids } };
    return await deleteManyMasterUsecase({
      data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const softDeleteMaster = (softDeleteMasterUsecase) => async (data,id,req = {},res = {},loggedInUser) => {
  try {
    const query = { _id:id };

    const dataToUpdate = { isDeleted: true, };
    return await softDeleteMasterUsecase({
      data,
      dataToUpdate,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const partialUpdateMaster = (partialUpdateMasterUsecase) => async (data,id,req = {},res = {}, loggedInUser) => {
  try {
    delete data.updatedBy;
    data.updatedBy = loggedInUser.id;
    let query = { _id: id };
    let result = await partialUpdateMasterUsecase({
      data,
      query
    },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const updateMaster = (updateMasterUsecase) => async (data,id,req = {},res = {}, loggedInUser) =>{
  try {
    delete data.addedBy;
    delete data.updatedBy;
    data.updatedBy = loggedInUser.id;
    let query = { _id:id };
    let result = await updateMasterUsecase({
      data,
      query
    },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const getMaster = (getMasterUsecase) => async (query, data = {},req = {},res = {}) =>{
  try {
    let options = {};
    if (data && data.populate && data.populate.length) options.populate = data.populate;
    if (data && data.select) {
      options.select = getSelectObject(data.select);
    }
    return await getMasterUsecase({
      data,
      query,
      options
    },req,res);
  } catch (error) {
    return response.internalServerError();
  }
};

const deleteMaster = (deleteMasterUsecase) => async (data,id,req = {},res = {},loggedInUser) => {
  try {
    let query = { _id:id };
    return await deleteMasterUsecase({
      data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

module.exports = {
  addMaster,
  findAllMaster,
  getMasterCount,
  getMasterByAggregate,
  softDeleteManyMaster,
  bulkInsertMaster,
  bulkUpdateMaster,
  deleteManyMaster,
  softDeleteMaster,
  partialUpdateMaster,
  updateMaster,
  getMaster,
  deleteMaster,
};
