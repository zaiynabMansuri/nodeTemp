const response = require('../../../../utils/response'); 
const getSelectObject = require('../../../../utils/getSelectObject'); 
const authConstant = require('../../../../constants/authConstant');

const addUser = (addUserUsecase) => async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    data.addedBy = loggedInUser.id.toString();
    let result = await addUserUsecase({ data },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const findAllUser = (findAllUserUsecase) => async ({
  data, loggedInUser
},req = {},res = {}) => {
  try {
    let query = data.query ? data.query : {};
    let options = data.options ? data.options : {};
    if (loggedInUser){
      query = {
        ...query,
        ...{ '_id': { $ne: loggedInUser.id } } 
      };
      if (data.query && data.query._id) {
        Object.assign(query._id, { $in: [data.query._id] });
      }
    }
    else {
      return response.badRequest();
    }
    return await findAllUserUsecase({
      data,
      query,
      options
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const getUserCount = (getUserCountUsecase) => async (data,req = {},res = {}) => {
  try {
    let where = data && data.where ? data.where : {};
    return await getUserCountUsecase({ where },req,res);  
  } catch (error){
    return response.internalServerError();
  }
};

const getUserByAggregate = (getUserByAggregateUsecase)=> async ({ data },req = {},res = {}) =>{
  try {
    return await getUserByAggregateUsecase({ data },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const softDeleteManyUser = (softDeleteManyUserUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    let ids = data.ids;
    let query = {};
    if (loggedInUser){
      query = {
        '_id': {
          '$in': ids,
          '$ne': loggedInUser.id
        }
      };
    }
    else {
      return response.badRequest();
    } 

    const dataToUpdate = {
      isDeleted: true,
      updatedBy: loggedInUser.id,
    };
    return await softDeleteManyUserUsecase({
      data,
      query,
      dataToUpdate
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const bulkInsertUser = (bulkInsertUserUsecase)=> async ({
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
    let result = await bulkInsertUserUsecase({ data },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const bulkUpdateUser = (bulkUpdateUserUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    delete data.data.addedBy;
    delete data.data.updatedBy;
    data.data.updatedBy = loggedInUser.id;
    let query = {};
    if (loggedInUser){
      query = {
        '_id': { '$ne': loggedInUser.id },
        ...data.filter
      };
      if (data.filter && data.filter._id){ 
        Object.assign(query._id, { $in: [ data.query._id] });
      }
    } else {
      return response.badRequest();
    }
    return await bulkUpdateUserUsecase({
      data: data.data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const deleteManyUser = (deleteManyUserUsecase) => async (data,req = {},res = {}, loggedInUser) => {
  try {
    let ids = data.ids;
    let query = {};
    if (loggedInUser){
      query = {
        '_id': {
          '$in': ids,
          '$ne': loggedInUser.id
        }
      };
    }
    else {
      return response.badRequest();
    } 
    return await deleteManyUserUsecase({
      data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const softDeleteUser = (softDeleteUserUsecase) => async (data,id,req = {},res = {},loggedInUser) => {
  try {
    let query = {};
    if (loggedInUser){
      query = {
        '_id': {
          '$eq': id,
          '$ne': loggedInUser.id
        }
      };
    }
    else {
      return response.badRequest();
    }

    const dataToUpdate = {
      isDeleted: true,
      updatedBy: loggedInUser.id,
    };
    return await softDeleteUserUsecase({
      data,
      dataToUpdate,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const partialUpdateUser = (partialUpdateUserUsecase) => async (data,id,req = {},res = {}, loggedInUser) => {
  try {
    delete data.updatedBy;
    data.updatedBy = loggedInUser.id;
    let query = {};
    if (loggedInUser){
      query = {
        '_id': {
          '$eq': id,
          '$ne': loggedInUser.id
        }
      };
    }
    else {
      return response.badRequest();
    }
    let result = await partialUpdateUserUsecase({
      data,
      query
    },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const updateUser = (updateUserUsecase) => async (data,id,req = {},res = {}, loggedInUser) =>{
  try {
    delete data.addedBy;
    delete data.updatedBy;
    data.updatedBy = loggedInUser.id;
    let query = {};
    if (loggedInUser){
      query = {
        '_id': {
          '$eq': id,
          '$ne': loggedInUser.id
        }
      };
    } else {
      return response.badRequest();
    }
    let result = await updateUserUsecase({
      data,
      query
    },req,res);
    return result;
  } catch (error){
    return response.internalServerError();
  }
};

const getUser = (getUserUsecase) => async (query, data = {},req = {},res = {}) =>{
  try {
    let options = {};
    if (data && data.populate && data.populate.length) options.populate = data.populate;
    if (data && data.select) {
      options.select = getSelectObject(data.select);
    }
    return await getUserUsecase({
      data,
      query,
      options
    },req,res);
  } catch (error) {
    return response.internalServerError();
  }
};

const deleteUser = (deleteUserUsecase) => async (data,id,req = {},res = {},loggedInUser) => {
  try {
    let query = {};
    if (loggedInUser){
      query = {
        '_id': {
          '$eq': id,
          '$ne': loggedInUser.id
        }
      };
    }
    else {
      return response.badRequest();
    } 
    return await deleteUserUsecase({
      data,
      query
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

const changePassword = (changePasswordUsecase) => async (params,req = {},res = {}) => {
  try {
    return await changePasswordUsecase(params,req,res);
  } catch (error){
    return response.internalServerError();
  }
};  

const updateProfile = (updateProfileUsecase) => async (data,id,req = {},res = {}) => {
  try {
    return await updateProfileUsecase({
      data,
      id
    },req,res);
  } catch (error){
    return response.internalServerError();
  }
};

module.exports = {
  addUser,
  findAllUser,
  getUserCount,
  getUserByAggregate,
  softDeleteManyUser,
  bulkInsertUser,
  bulkUpdateUser,
  deleteManyUser,
  softDeleteUser,
  partialUpdateUser,
  updateUser,
  getUser,
  deleteUser,
  changePassword,
  updateProfile,
};
