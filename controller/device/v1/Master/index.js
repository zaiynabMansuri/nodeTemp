const MasterDb = require('../../../../data-access/MasterDb');

const MasterSchema = require('../../../../validation/schema/Master');

const createValidation = require('../../../../validation')(MasterSchema.createSchema);
const updateValidation = require('../../../../validation')(MasterSchema.updateSchema);
const filterValidation = require('../../../../validation')(MasterSchema.filterValidationSchema);

const addMasterUsecase = require('../../../../use-case/Master/addMaster')({
  MasterDb,
  createValidation 
});
const findAllMasterUsecase = require('../../../../use-case/Master/findAllMaster')({
  MasterDb,
  filterValidation
});
const getMasterCountUsecase = require('../../../../use-case/Master/getMasterCount')({
  MasterDb,
  filterValidation
});
const getMasterByAggregateUsecase = require('../../../../use-case/Master/getMasterByAggregate')({ MasterDb });
const softDeleteManyMasterUsecase = require('../../../../use-case/Master/softDeleteManyMaster')({ MasterDb });
const bulkInsertMasterUsecase = require('../../../../use-case/Master/bulkInsertMaster')({ MasterDb });
const bulkUpdateMasterUsecase = require('../../../../use-case/Master/bulkUpdateMaster')({ MasterDb });
const deleteManyMasterUsecase = require('../../../../use-case/Master/deleteManyMaster')({ MasterDb });
const softDeleteMasterUsecase = require('../../../../use-case/Master/softDeleteMaster')({ MasterDb });
const partialUpdateMasterUsecase = require('../../../../use-case/Master/partialUpdateMaster')({
  MasterDb,
  updateValidation
});
const updateMasterUsecase = require('../../../../use-case/Master/updateMaster')({
  MasterDb,
  updateValidation 
});
const getMasterUsecase = require('../../../../use-case/Master/getMaster')({
  MasterDb,
  filterValidation
});
const deleteMasterUsecase = require('../../../../use-case/Master/deleteMaster')({ MasterDb });

const MasterController = require('./Master');

const addMaster = MasterController.addMaster(addMasterUsecase);
const findAllMaster = MasterController.findAllMaster(findAllMasterUsecase);
const getMasterCount = MasterController.getMasterCount(getMasterCountUsecase);
const getMasterByAggregate = MasterController.getMasterByAggregate(getMasterByAggregateUsecase);
const softDeleteManyMaster = MasterController.softDeleteManyMaster(softDeleteManyMasterUsecase);
const bulkInsertMaster = MasterController.bulkInsertMaster(bulkInsertMasterUsecase);
const bulkUpdateMaster = MasterController.bulkUpdateMaster(bulkUpdateMasterUsecase);
const deleteManyMaster = MasterController.deleteManyMaster(deleteManyMasterUsecase);
const softDeleteMaster = MasterController.softDeleteMaster(softDeleteMasterUsecase);
const partialUpdateMaster = MasterController.partialUpdateMaster(partialUpdateMasterUsecase);
const updateMaster = MasterController.updateMaster(updateMasterUsecase);
const getMasterById = MasterController.getMaster(getMasterUsecase);
const deleteMaster = MasterController.deleteMaster(deleteMasterUsecase);

module.exports = {
  addMaster,
  findAllMaster,
  getMasterCount,
  getMasterByAggregate,
  softDeleteManyMaster,
  bulkInsertMaster,
  bulkUpdateMaster,
  deleteManyMaster,
  softDeleteMaster,
  partialUpdateMaster,
  updateMaster,
  getMasterById,
  deleteMaster,
};