const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('../commonFilterValidation');

const { USER_ROLE } = require('../../constants/authConstant');
const convertObjectToEnum = require('../../utils/convertObjectToEnum');

const createSchema = joi.object({
  username: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  mobileNo: joi.string().allow(null).allow(''),
  role: joi.number().integer().valid(...convertObjectToEnum(USER_ROLE)).allow(0),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date().options({ convert: true })
  }),
  isDeleted: joi.boolean()
}).unknown(true);

const updateSchema = joi.object({
  username: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  mobileNo: joi.string().allow(null).allow(''),
  role: joi.number().integer().valid(...convertObjectToEnum(USER_ROLE)).allow(0),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date().options({ convert: true })
  }),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}
).unknown(true);

let keys = ['query', 'where'];
let filterValidationSchema = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      username: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      mobileNo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      role: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      createdAt: joi.any(),
      updatedAt: joi.any()
    }
    ).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select

}).unknown(true);

module.exports = {
  createSchema,
  updateSchema,
  filterValidationSchema
};