const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('../commonFilterValidation');

const createSchema = joi.object({
  name: joi.string().allow(null).allow(''),
  decription: joi.string().allow(null).allow(''),
  code: joi.string().allow(null).allow(''),
  validityInDays: joi.string().allow(null).allow(''),
  minimumUser: joi.number().integer().allow(0),
  maximumUser: joi.number().integer().allow(0),
  perUserAmount: joi.number().integer().allow(0),
  markup: joi.number().integer().allow(0),
  discount: joi.number().integer().allow(0),
  validFrom: joi.date().options({ convert: true }).allow(null).allow(''),
  validTo: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

const updateSchema = joi.object({
  name: joi.string().allow(null).allow(''),
  decription: joi.string().allow(null).allow(''),
  code: joi.string().allow(null).allow(''),
  validityInDays: joi.string().allow(null).allow(''),
  minimumUser: joi.number().integer().allow(0),
  maximumUser: joi.number().integer().allow(0),
  perUserAmount: joi.number().integer().allow(0),
  markup: joi.number().integer().allow(0),
  discount: joi.number().integer().allow(0),
  validFrom: joi.date().options({ convert: true }).allow(null).allow(''),
  validTo: joi.date().options({ convert: true }).allow(null).allow(''),
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
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      decription: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      code: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      validityInDays: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      minimumUser: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      maximumUser: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      perUserAmount: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      markup: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      discount: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      validFrom: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      validTo: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
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