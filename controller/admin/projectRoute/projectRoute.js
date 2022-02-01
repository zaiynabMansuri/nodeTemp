const response = require('../../../utils/response'); 
const getSelectObject = require('../../../utils/getSelectObject'); 

const addProjectRoute = (addProjectRouteUsecase) => async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    data.addedBy = loggedInUser.id.toString();
    let result = await addProjectRouteUsecase({ data },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const bulkInsertProjectRoute = (bulkInsertProjectRouteUsecase)=> async ({
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
    let result = await bulkInsertProjectRouteUsecase({ data },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const findAllProjectRoute = (findAllProjectRouteUsecase) => async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    let query = data.query ? data.query : {};
    let options = data.options ? data.options : {};
    return await findAllProjectRouteUsecase({
      data,
      query,
      options
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const getProjectRouteCount = (getProjectRouteCountUsecase) => async (data,req = {},res = {}) => {
  try {
    let where = data && data.where ? data.where : {};
    return await getProjectRouteCountUsecase({ where },req,res);  
  } catch (error){
    return response.internalServerError();
  }
};

const bulkUpdateProjectRoute = (bulkUpdateProjectRouteUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    delete data.data.addedBy;
    delete data.data.updatedBy;
    data.data.updatedBy = loggedInUser.id;
    let query = data.filter;
    return await bulkUpdateProjectRouteUsecase({
      data: data.data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const softDeleteManyProjectRoute = (softDeleteManyProjectRouteUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    let ids = data.ids;
    const query = { '_id':{ '$in':ids } };

    const dataToUpdate = { isDeleted: true, };
    return await softDeleteManyProjectRouteUsecase({
      data,
      query,
      dataToUpdate
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const deleteManyProjectRoute = (deleteManyProjectRouteUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    let ids = data.ids;
    const query = { '_id':{ '$in':ids } };
    return await deleteManyProjectRouteUsecase({
      data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const getProjectRouteByAggregate = (getProjectRouteByAggregateUsecase)=> async ({ data },req = {},res = {}) =>{
  try {
    return await getProjectRouteByAggregateUsecase({ data },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const softDeleteProjectRoute = (softDeleteProjectRouteUsecase) => async (data,id,req = {},res = {},loggedInUser) => {
  try {
    const query = { _id:id };

    const dataToUpdate = { isDeleted: true, };
    return await softDeleteProjectRouteUsecase({
      data,
      dataToUpdate,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const partialUpdateProjectRoute = (partialUpdateProjectRouteUsecase) => async (data,id,req = {},res = {}, loggedInUser) => {
  try {
    delete data.updatedBy;
    data.updatedBy = loggedInUser.id;
    let query = { _id: id };
    let result = await partialUpdateProjectRouteUsecase({
      data,
      query
    },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const updateProjectRoute = (updateProjectRouteUsecase) => async (data,id,req = {},res = {}, loggedInUser) =>{
  try {
    delete data.addedBy;
    delete data.updatedBy;
    data.updatedBy = loggedInUser.id;
    let query = { _id:id };
    let result = await updateProjectRouteUsecase({
      data,
      query
    },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const getProjectRoute = (getProjectRouteUsecase) => async (query, data = {},req = {},res = {}) =>{
  try {
    let options = {};
    if (data && data.populate && data.populate.length) options.populate = data.populate;
    if (data && data.select) {
      options.select = getSelectObject(data.select);
    }
    return await getProjectRouteUsecase({
      data,
      query,
      options
    },req,res);
  } catch (error) {
    return response.internalServerError();
  }
};

const deleteProjectRoute = (deleteProjectRouteUsecase) => async (data,id,req = {},res = {},loggedInUser) => {
  try {
    let query = { _id:id };
    return await deleteProjectRouteUsecase({
      data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

module.exports = {
  addProjectRoute,
  bulkInsertProjectRoute,
  findAllProjectRoute,
  getProjectRouteCount,
  bulkUpdateProjectRoute,
  softDeleteManyProjectRoute,
  deleteManyProjectRoute,
  getProjectRouteByAggregate,
  softDeleteProjectRoute,
  partialUpdateProjectRoute,
  updateProjectRoute,
  getProjectRoute,
  deleteProjectRoute,
};
