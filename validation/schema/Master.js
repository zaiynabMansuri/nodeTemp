const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('../commonFilterValidation');

const createSchema = joi.object({
  name: joi.string().allow(null).allow(''),
  slug: joi.string().allow(null).allow(''),
  code: joi.string().allow(null).allow(''),
  group: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  sequence: joi.number().integer().allow(0),
  image: joi.string().allow(null).allow(''),
  parentId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  parentCode: joi.boolean(),
  isDefault: joi.boolean().default(false),
  isDeleted: joi.boolean().default(false),
  isActive: joi.boolean()
}).unknown(true);

const updateSchema = joi.object({
  name: joi.string().allow(null).allow(''),
  slug: joi.string().allow(null).allow(''),
  code: joi.string().allow(null).allow(''),
  group: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  sequence: joi.number().integer().allow(0),
  image: joi.string().allow(null).allow(''),
  parentId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  parentCode: joi.boolean(),
  isDefault: joi.boolean().default(false),
  isDeleted: joi.boolean().default(false),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}
).unknown(true);

let keys = ['query', 'where'];
let filterValidationSchema = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      slug: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      code: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      group: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      sequence: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      parentId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      parentCode: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDefault: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
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