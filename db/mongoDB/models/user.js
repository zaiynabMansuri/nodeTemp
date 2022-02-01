let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');
const convertObjectToEnum = require('../../../utils/convertObjectToEnum');
const { USER_ROLE } =  require('../../../constants/authConstant');
const bcrypt = require('bcrypt');

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
  username: { type:String },
  password: { type:String },
  email: { type:String },
  name: { type:String },
  isActive: { type:Boolean },
  createdAt: { type:Date },
  updatedAt: { type:Date },
  addedBy: {
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  updatedBy: {
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  mobileNo: { type:String },
  isDeleted: { type:Boolean },
  role: {
    type:Number,
    enum:convertObjectToEnum(USER_ROLE),
    required:true
  },
  resetPasswordLink: {
    code:String,
    expireTime:Date
  },
  loginRetryLimit: {
    type:Number,
    default:0
  },
  loginReactiveTime: { type:Date }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt' 
  } 
});
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  if (this.password){
    this.password = await bcrypt.hash(this.password, 8);
  }
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

schema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};
schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals: true });
  object.id = _id;
  delete object.password;
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const user = mongoose.model('user',schema, 'user');
module.exports = user;
