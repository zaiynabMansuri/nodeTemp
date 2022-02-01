module.exports = (role) => {

  let newRole = { 
    name: role.name,
    code: role.code,
    weight: role.weight,
    isActive: role.isActive,
    isDeleted: role.isDeleted,
    addedBy: role.addedBy,
  };

  // remove undefined values
  Object.keys(newRole).forEach(key => newRole[key] === undefined && delete newRole[key]);

  // To validate Entity uncomment this block

  /*
   * const validate = (newRole) => {
   *   if (!newRole.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * 
   * validate(newRole) 
   */
  return Object.freeze(newRole);
};
