let Plan = require('../db/mongoDB/models/Plan');
let {
  create,
  createMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  softDelete,
  softDeleteMany,
  findOne,
  findMany,
  paginate,
  count,
  upsert,
  aggregate 
} = require('../db/mongoDB/dbService')(Plan);

module.exports = {
  create,
  createMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  softDelete,
  softDeleteMany,
  findOne,
  findMany,
  paginate,
  count,
  upsert,
  aggregate
};