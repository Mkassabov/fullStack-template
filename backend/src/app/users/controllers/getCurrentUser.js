const { handleAsyncErrors } = require("@/utils/async");

function getCurrentUser(req, res, next) {
  const user = req.user.toObject();
  res.success({ user });
}

module.exports = handleAsyncErrors(getCurrentUser);
