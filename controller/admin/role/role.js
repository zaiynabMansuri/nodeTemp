const response = require('../../../utils/response'); 
const getSelectObject = require('../../../utils/getSelectObject'); 

const addRole = (addRoleUsecase) => async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    data.addedBy = loggedInUser.id.toString();
    let result = await addRoleUsecase({ data },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const bulkInsertRole = (bulkInsertRoleUsecase)=> async ({
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
    let result = await bulkInsertRoleUsecase({ data },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const findAllRole = (findAllRoleUsecase) => async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    let query = data.query ? data.query : {};
    let options = data.options ? data.options : {};
    return await findAllRoleUsecase({
      data,
      query,
      options
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const getRoleCount = (getRoleCountUsecase) => async (data,req = {},res = {}) => {
  try {
    let where = data && data.where ? data.where : {};
    return await getRoleCountUsecase({ where },req,res);  
  } catch (error){
    return response.internalServerError();
  }
};

const bulkUpdateRole = (bulkUpdateRoleUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    delete data.data.addedBy;
    delete data.data.updatedBy;
    data.data.updatedBy = loggedInUser.id;
    let query = data.filter;
    return await bulkUpdateRoleUsecase({
      data: data.data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const softDeleteManyRole = (softDeleteManyRoleUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    let ids = data.ids;
    const query = { '_id':{ '$in':ids } };

    const dataToUpdate = { isDeleted: true, };
    return await softDeleteManyRoleUsecase({
      data,
      query,
      dataToUpdate
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const deleteManyRole = (deleteManyRoleUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    let ids = data.ids;
    const query = { '_id':{ '$in':ids } };
    return await deleteManyRoleUsecase({
      data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const getRoleByAggregate = (getRoleByAggregateUsecase)=> async ({ data },req = {},res = {}) =>{
  try {
    return await getRoleByAggregateUsecase({ data },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const softDeleteRole = (softDeleteRoleUsecase) => async (data,id,req = {},res = {},loggedInUser) => {
  try {
    const query = { _id:id };

    const dataToUpdate = { isDeleted: true, };
    return await softDeleteRoleUsecase({
      data,
      dataToUpdate,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const partialUpdateRole = (partialUpdateRoleUsecase) => async (data,id,req = {},res = {}, loggedInUser) => {
  try {
    delete data.updatedBy;
    data.updatedBy = loggedInUser.id;
    let query = { _id: id };
    let result = await partialUpdateRoleUsecase({
      data,
      query
    },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const updateRole = (updateRoleUsecase) => async (data,id,req = {},res = {}, loggedInUser) =>{
  try {
    delete data.addedBy;
    delete data.updatedBy;
    data.updatedBy = loggedInUser.id;
    let query = { _id:id };
    let result = await updateRoleUsecase({
      data,
      query
    },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const getRole = (getRoleUsecase) => async (query, data = {},req = {},res = {}) =>{
  try {
    let options = {};
    if (data && data.populate && data.populate.length) options.populate = data.populate;
    if (data && data.select) {
      options.select = getSelectObject(data.select);
    }
    return await getRoleUsecase({
      data,
      query,
      options
    },req,res);
  } catch (error) {
    return response.internalServerError();
  }
};

const deleteRole = (deleteRoleUsecase) => async (data,id,req = {},res = {},loggedInUser) => {
  try {
    let query = { _id:id };
    return await deleteRoleUsecase({
      data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

module.exports = {
  addRole,
  bulkInsertRole,
  findAllRole,
  getRoleCount,
  bulkUpdateRole,
  softDeleteManyRole,
  deleteManyRole,
  getRoleByAggregate,
  softDeleteRole,
  partialUpdateRole,
  updateRole,
  getRole,
  deleteRole,
};
