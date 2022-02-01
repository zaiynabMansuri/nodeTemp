const response = require('../../../utils/response'); 
const getSelectObject = require('../../../utils/getSelectObject'); 

const addUserRole = (addUserRoleUsecase) => async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    data.addedBy = loggedInUser.id.toString();
    let result = await addUserRoleUsecase({ data },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const bulkInsertUserRole = (bulkInsertUserRoleUsecase)=> async ({
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
    let result = await bulkInsertUserRoleUsecase({ data },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const findAllUserRole = (findAllUserRoleUsecase) => async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    let query = data.query ? data.query : {};
    let options = data.options ? data.options : {};
    return await findAllUserRoleUsecase({
      data,
      query,
      options
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const getUserRoleCount = (getUserRoleCountUsecase) => async (data,req = {},res = {}) => {
  try {
    let where = data && data.where ? data.where : {};
    return await getUserRoleCountUsecase({ where },req,res);  
  } catch (error){
    return response.internalServerError();
  }
};

const bulkUpdateUserRole = (bulkUpdateUserRoleUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    delete data.data.addedBy;
    delete data.data.updatedBy;
    data.data.updatedBy = loggedInUser.id;
    let query = data.filter;
    return await bulkUpdateUserRoleUsecase({
      data: data.data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const softDeleteManyUserRole = (softDeleteManyUserRoleUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    const query = { _id:{ $in:data.ids } };
    const dataToUpdate = { isDeleted: true, };
    return await softDeleteManyUserRoleUsecase({
      dataToUpdate,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const deleteManyUserRole = (deleteManyUserRoleUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    let ids = data.ids;
    const query = { '_id':{ '$in':ids } };
    return await deleteManyUserRoleUsecase({ query },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const getUserRoleByAggregate = (getUserRoleByAggregateUsecase)=> async ({ data },req = {},res = {}) =>{
  try {
    return await getUserRoleByAggregateUsecase({ data },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const softDeleteUserRole = (softDeleteUserRoleUsecase) => async (data,id,req = {},res = {},loggedInUser)=>{
  try {
    const query = { _id:id };

    const dataToUpdate = { isDeleted: true, };
    return await softDeleteUserRoleUsecase({
      data,
      dataToUpdate,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const partialUpdateUserRole = (partialUpdateUserRoleUsecase) => async (data,id,req = {},res = {}, loggedInUser) => {
  try {
    delete data.updatedBy;
    data.updatedBy = loggedInUser.id;
    let query = { _id: id };
    let result = await partialUpdateUserRoleUsecase({
      data,
      query
    },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const updateUserRole = (updateUserRoleUsecase) => async (data,id,req = {},res = {}, loggedInUser) =>{
  try {
    delete data.addedBy;
    delete data.updatedBy;
    data.updatedBy = loggedInUser.id;
    let query = { _id:id };
    let result = await updateUserRoleUsecase({
      data,
      query
    },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const getUserRole = (getUserRoleUsecase) => async (query, data = {},req = {},res = {}) =>{
  try {
    let options = {};
    if (data && data.populate && data.populate.length) options.populate = data.populate;
    if (data && data.select) {
      options.select = getSelectObject(data.select);
    }
    return await getUserRoleUsecase({
      data,
      query,
      options
    },req,res);
  } catch (error) {
    return response.internalServerError();
  }
};

const deleteUserRole = (deleteUserRoleUsecase) => async (data,id,req = {},res = {},loggedInUser) => {
  try {
    let query = { _id:id };
    return await deleteUserRoleUsecase({ query },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

module.exports = {
  addUserRole,
  bulkInsertUserRole,
  findAllUserRole,
  getUserRoleCount,
  bulkUpdateUserRole,
  softDeleteManyUserRole,
  deleteManyUserRole,
  getUserRoleByAggregate,
  softDeleteUserRole,
  partialUpdateUserRole,
  updateUserRole,
  getUserRole,
  deleteUserRole,
};
