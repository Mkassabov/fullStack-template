const { User } = require("./model");

function createUser(data) {
  return User.create(data);
}

function findUserById(userId, { fields } = {}) {
  return User.findOne({ _id: userId }, fields);
}

module.exports = {
  createUser,
  findUserById,
};
