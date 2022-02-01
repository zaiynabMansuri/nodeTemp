const response = require('../../../utils/response'); 
const getSelectObject = require('../../../utils/getSelectObject'); 

const addRouteRole = (addRouteRoleUsecase) => async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    data.addedBy = loggedInUser.id.toString();
    let result = await addRouteRoleUsecase({ data },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const bulkInsertRouteRole = (bulkInsertRouteRoleUsecase)=> async ({
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
    let result = await bulkInsertRouteRoleUsecase({ data },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const findAllRouteRole = (findAllRouteRoleUsecase) => async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    let query = data.query ? data.query : {};
    let options = data.options ? data.options : {};
    return await findAllRouteRoleUsecase({
      data,
      query,
      options
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const getRouteRoleCount = (getRouteRoleCountUsecase) => async (data,req = {},res = {}) => {
  try {
    let where = data && data.where ? data.where : {};
    return await getRouteRoleCountUsecase({ where },req,res);  
  } catch (error){
    return response.internalServerError();
  }
};

const bulkUpdateRouteRole = (bulkUpdateRouteRoleUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    delete data.data.addedBy;
    delete data.data.updatedBy;
    data.data.updatedBy = loggedInUser.id;
    let query = data.filter;
    return await bulkUpdateRouteRoleUsecase({
      data: data.data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const softDeleteManyRouteRole = (softDeleteManyRouteRoleUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    const query = { _id:{ $in:data.ids } };
    const dataToUpdate = { isDeleted: true, };
    return await softDeleteManyRouteRoleUsecase({
      dataToUpdate,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const deleteManyRouteRole = (deleteManyRouteRoleUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    let ids = data.ids;
    const query = { '_id':{ '$in':ids } };
    return await deleteManyRouteRoleUsecase({ query },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const getRouteRoleByAggregate = (getRouteRoleByAggregateUsecase)=> async ({ data },req = {},res = {}) =>{
  try {
    return await getRouteRoleByAggregateUsecase({ data },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const softDeleteRouteRole = (softDeleteRouteRoleUsecase) => async (data,id,req = {},res = {},loggedInUser)=>{
  try {
    const query = { _id:id };

    const dataToUpdate = { isDeleted: true, };
    return await softDeleteRouteRoleUsecase({
      data,
      dataToUpdate,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const partialUpdateRouteRole = (partialUpdateRouteRoleUsecase) => async (data,id,req = {},res = {}, loggedInUser) => {
  try {
    delete data.updatedBy;
    data.updatedBy = loggedInUser.id;
    let query = { _id: id };
    let result = await partialUpdateRouteRoleUsecase({
      data,
      query
    },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const updateRouteRole = (updateRouteRoleUsecase) => async (data,id,req = {},res = {}, loggedInUser) =>{
  try {
    delete data.addedBy;
    delete data.updatedBy;
    data.updatedBy = loggedInUser.id;
    let query = { _id:id };
    let result = await updateRouteRoleUsecase({
      data,
      query
    },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const getRouteRole = (getRouteRoleUsecase) => async (query, data = {},req = {},res = {}) =>{
  try {
    let options = {};
    if (data && data.populate && data.populate.length) options.populate = data.populate;
    if (data && data.select) {
      options.select = getSelectObject(data.select);
    }
    return await getRouteRoleUsecase({
      data,
      query,
      options
    },req,res);
  } catch (error) {
    return response.internalServerError();
  }
};

const deleteRouteRole = (deleteRouteRoleUsecase) => async (data,id,req = {},res = {},loggedInUser) => {
  try {
    let query = { _id:id };
    return await deleteRouteRoleUsecase({ query },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

module.exports = {
  addRouteRole,
  bulkInsertRouteRole,
  findAllRouteRole,
  getRouteRoleCount,
  bulkUpdateRouteRole,
  softDeleteManyRouteRole,
  deleteManyRouteRole,
  getRouteRoleByAggregate,
  softDeleteRouteRole,
  partialUpdateRouteRole,
  updateRouteRole,
  getRouteRole,
  deleteRouteRole,
};
