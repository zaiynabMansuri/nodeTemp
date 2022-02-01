module.exports = (userTokens) => {

  let newUserTokens = { 
    userId: userTokens.userId,
    token: userTokens.token,
    tokenExpiredTime: userTokens.tokenExpiredTime,
    isTokenExpired: userTokens.isTokenExpired,
    isDeleted: userTokens.isDeleted,
    isActive: userTokens.isActive,
    addedBy: userTokens.addedBy,
  };

  // remove undefined values
  Object.keys(newUserTokens).forEach(key => newUserTokens[key] === undefined && delete newUserTokens[key]);

  // To validate Entity uncomment this block

  /*
   * const validate = (newUserTokens) => {
   *   if (!newUserTokens.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * 
   * validate(newUserTokens) 
   */
  return Object.freeze(newUserTokens);
};
