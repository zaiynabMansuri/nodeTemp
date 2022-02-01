const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('../commonFilterValidation');

const createSchema = joi.object({
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  token: joi.string().allow(null).allow(''),
  tokenExpiredTime: joi.date().options({ convert: true }).allow(null).allow(''),
  isTokenExpired: joi.boolean().default(false),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

const updateSchema = joi.object({
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  token: joi.string().allow(null).allow(''),
  tokenExpiredTime: joi.date().options({ convert: true }).allow(null).allow(''),
  isTokenExpired: joi.boolean().default(false),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}
).unknown(true);

let keys = ['query', 'where'];
let filterValidationSchema = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      userId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      token: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      tokenExpiredTime: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isTokenExpired: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
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