let Master = require('../db/mongoDB/models/Master');
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
} = require('../db/mongoDB/dbService')(Master);

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