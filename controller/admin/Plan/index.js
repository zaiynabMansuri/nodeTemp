const PlanDb = require('../../../data-access/PlanDb');

const PlanSchema = require('../../../validation/schema/Plan');

const createValidation = require('../../../validation')(PlanSchema.createSchema);
const updateValidation = require('../../../validation')(PlanSchema.updateSchema);
const filterValidation = require('../../../validation')(PlanSchema.filterValidationSchema);

const addPlanUsecase = require('../../../use-case/Plan/addPlan')({
  PlanDb,
  createValidation 
});
const findAllPlanUsecase = require('../../../use-case/Plan/findAllPlan')({
  PlanDb,
  filterValidation
});
const getPlanCountUsecase = require('../../../use-case/Plan/getPlanCount')({
  PlanDb,
  filterValidation
});
const getPlanByAggregateUsecase = require('../../../use-case/Plan/getPlanByAggregate')({ PlanDb });
const softDeleteManyPlanUsecase = require('../../../use-case/Plan/softDeleteManyPlan')({ PlanDb });
const bulkInsertPlanUsecase = require('../../../use-case/Plan/bulkInsertPlan')({ PlanDb });
const bulkUpdatePlanUsecase = require('../../../use-case/Plan/bulkUpdatePlan')({ PlanDb });
const deleteManyPlanUsecase = require('../../../use-case/Plan/deleteManyPlan')({ PlanDb });
const softDeletePlanUsecase = require('../../../use-case/Plan/softDeletePlan')({ PlanDb });
const partialUpdatePlanUsecase = require('../../../use-case/Plan/partialUpdatePlan')({
  PlanDb,
  updateValidation
});
const updatePlanUsecase = require('../../../use-case/Plan/updatePlan')({
  PlanDb,
  updateValidation 
});
const getPlanUsecase = require('../../../use-case/Plan/getPlan')({
  PlanDb,
  filterValidation
});
const deletePlanUsecase = require('../../../use-case/Plan/deletePlan')({ PlanDb });

const PlanController = require('./Plan');

const addPlan = PlanController.addPlan(addPlanUsecase);
const findAllPlan = PlanController.findAllPlan(findAllPlanUsecase);
const getPlanCount = PlanController.getPlanCount(getPlanCountUsecase);
const getPlanByAggregate = PlanController.getPlanByAggregate(getPlanByAggregateUsecase);
const softDeleteManyPlan = PlanController.softDeleteManyPlan(softDeleteManyPlanUsecase);
const bulkInsertPlan = PlanController.bulkInsertPlan(bulkInsertPlanUsecase);
const bulkUpdatePlan = PlanController.bulkUpdatePlan(bulkUpdatePlanUsecase);
const deleteManyPlan = PlanController.deleteManyPlan(deleteManyPlanUsecase);
const softDeletePlan = PlanController.softDeletePlan(softDeletePlanUsecase);
const partialUpdatePlan = PlanController.partialUpdatePlan(partialUpdatePlanUsecase);
const updatePlan = PlanController.updatePlan(updatePlanUsecase);
const getPlanById = PlanController.getPlan(getPlanUsecase);
const deletePlan = PlanController.deletePlan(deletePlanUsecase);

module.exports = {
  addPlan,
  findAllPlan,
  getPlanCount,
  getPlanByAggregate,
  softDeleteManyPlan,
  bulkInsertPlan,
  bulkUpdatePlan,
  deleteManyPlan,
  softDeletePlan,
  partialUpdatePlan,
  updatePlan,
  getPlanById,
  deletePlan,
};