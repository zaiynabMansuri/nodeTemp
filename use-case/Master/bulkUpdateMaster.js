/**
 *bulkUpdateMaster.js
 */

const response = require('../../utils/response');
/**
 * @description : update multiple records of Master with data by filter.
 * @param {obj} MasterDb : db service instance
 * @param {obj} params : {query: query to find data, data: data to update }
 * @return {obj} : response of bulkUpdate. {status, message, data}
 */
const bulkUpdateMaster = ({ MasterDb }) => async (params,req = {},res = {}) => {
  let {
    data, query 
  } = params;
  const results = await MasterDb.updateMany(query,data);
  return response.success({ data:results });
};
module.exports = bulkUpdateMaster;