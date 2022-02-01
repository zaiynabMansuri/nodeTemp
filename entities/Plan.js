module.exports = (Plan) => {

  let newPlan = { 
    name: Plan.name,
    decription: Plan.decription,
    code: Plan.code,
    validityInDays: Plan.validityInDays,
    minimumUser: Plan.minimumUser,
    maximumUser: Plan.maximumUser,
    perUserAmount: Plan.perUserAmount,
    markup: Plan.markup,
    discount: Plan.discount,
    validFrom: Plan.validFrom,
    validTo: Plan.validTo,
    isActive: Plan.isActive,
    createdAt: Plan.createdAt,
    updatedAt: Plan.updatedAt,
    updatedBy: Plan.updatedBy,
    addedBy: Plan.addedBy,
    isDeleted: Plan.isDeleted,
  };

  // remove undefined values
  Object.keys(newPlan).forEach(key => newPlan[key] === undefined && delete newPlan[key]);

  // To validate Entity uncomment this block

  /*
   * const validate = (newPlan) => {
   *   if (!newPlan.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * 
   * validate(newPlan) 
   */
  return Object.freeze(newPlan);
};
