let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');

const modelCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: modelCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema({
  name: { type:String },
  decription: { type:String },
  code: { type:String },
  validityInDays: { type:String },
  minimumUser: { type:Number },
  maximumUser: { type:Number },
  perUserAmount: { type:Number },
  markup: { type:Number },
  discount: { type:Number },
  validFrom: { type:Date },
  validTo: { type:Date },
  isActive: { type:Boolean },
  createdAt: { type:Date },
  updatedAt: { type:Date },
  updatedBy: {
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  addedBy: {
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  isDeleted: { type:Boolean }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt' 
  } 
});
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});
schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals: true });
  object.id = _id;
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const Plan = mongoose.model('Plan',schema, 'Plan');
module.exports = Plan;
