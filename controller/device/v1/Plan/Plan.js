const response = require('../../../../utils/response'); 
const getSelectObject = require('../../../../utils/getSelectObject'); 

const addPlan = (addPlanUsecase) => async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    data.addedBy = loggedInUser.id.toString();
    let result = await addPlanUsecase({ data },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const findAllPlan = (findAllPlanUsecase) => async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    let query = data.query ? data.query : {};
    let options = data.options ? data.options : {};
    return await findAllPlanUsecase({
      data,
      query,
      options
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const getPlanCount = (getPlanCountUsecase) => async (data,req = {},res = {}) => {
  try {
    let where = data && data.where ? data.where : {};
    return await getPlanCountUsecase({ where },req,res);  
  } catch (error){
    return response.internalServerError();
  }
};

const getPlanByAggregate = (getPlanByAggregateUsecase)=> async ({ data },req = {},res = {}) =>{
  try {
    return await getPlanByAggregateUsecase({ data },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const softDeleteManyPlan = (softDeleteManyPlanUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    const query = { _id:{ $in:data.ids } };
    const dataToUpdate = { isDeleted: true, };
    return await softDeleteManyPlanUsecase({
      dataToUpdate,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const bulkInsertPlan = (bulkInsertPlanUsecase)=> async ({
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
    let result = await bulkInsertPlanUsecase({ data },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const bulkUpdatePlan = (bulkUpdatePlanUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    delete data.data.addedBy;
    delete data.data.updatedBy;
    data.data.updatedBy = loggedInUser.id;
    let query = data.filter;
    return await bulkUpdatePlanUsecase({
      data: data.data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const deleteManyPlan = (deleteManyPlanUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    let ids = data.ids;
    const query = { '_id':{ '$in':ids } };
    return await deleteManyPlanUsecase({ query },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const softDeletePlan = (softDeletePlanUsecase) => async (data,id,req = {},res = {},loggedInUser)=>{
  try {
    const query = { _id:id };

    const dataToUpdate = { isDeleted: true, };
    return await softDeletePlanUsecase({
      data,
      dataToUpdate,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const partialUpdatePlan = (partialUpdatePlanUsecase) => async (data,id,req = {},res = {}, loggedInUser) => {
  try {
    delete data.updatedBy;
    data.updatedBy = loggedInUser.id;
    let query = { _id: id };
    let result = await partialUpdatePlanUsecase({
      data,
      query
    },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const updatePlan = (updatePlanUsecase) => async (data,id,req = {},res = {}, loggedInUser) =>{
  try {
    delete data.addedBy;
    delete data.updatedBy;
    data.updatedBy = loggedInUser.id;
    let query = { _id:id };
    let result = await updatePlanUsecase({
      data,
      query
    },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const getPlan = (getPlanUsecase) => async (query, data = {},req = {},res = {}) =>{
  try {
    let options = {};
    if (data && data.populate && data.populate.length) options.populate = data.populate;
    if (data && data.select) {
      options.select = getSelectObject(data.select);
    }
    return await getPlanUsecase({
      data,
      query,
      options
    },req,res);
  } catch (error) {
    return response.internalServerError();
  }
};

const deletePlan = (deletePlanUsecase) => async (data,id,req = {},res = {},loggedInUser) => {
  try {
    let query = { _id:id };
    return await deletePlanUsecase({ query },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

module.exports = {
  addPlan,
  findAllPlan,
  getPlanCount,
  getPlanByAggregate,
  softDeleteManyPlan,
  bulkInsertPlan,
  bulkUpdatePlan,
  deleteManyPlan,
  softDeletePlan,
  partialUpdatePlan,
  updatePlan,
  getPlan,
  deletePlan,
};
