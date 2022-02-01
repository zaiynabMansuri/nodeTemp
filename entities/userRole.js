module.exports = (userRole) => {

  let newUserRole = { 
    userId: userRole.userId,
    roleId: userRole.roleId,
    isActive: userRole.isActive,
    isDeleted: userRole.isDeleted,
    addedBy: userRole.addedBy,
  };

  // remove undefined values
  Object.keys(newUserRole).forEach(key => newUserRole[key] === undefined && delete newUserRole[key]);

  // To validate Entity uncomment this block

  /*
   * const validate = (newUserRole) => {
   *   if (!newUserRole.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * 
   * validate(newUserRole) 
   */
  return Object.freeze(newUserRole);
};
