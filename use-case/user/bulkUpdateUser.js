/**
 *bulkUpdateUser.js
 */

const response = require('../../utils/response');
/**
 * @description : update multiple records of user with data by filter.
 * @param {obj} userDb : db service instance
 * @param {obj} params : {query: query to find data, data: data to update }
 * @return {obj} : response of bulkUpdate. {status, message, data}
 */
const bulkUpdateUser = ({ userDb }) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;
  const results = await userDb.updateMany(query,data);
  return response.success({ data:results });
};
module.exports = bulkUpdateUser;