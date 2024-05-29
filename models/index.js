const zooUser = require("./zooUser");
const Animal = require("./Animal");

zooUser.hasMany(Animal, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Animal.belongsTo(zooUser, {
  foreignKey: "user_id",
});

module.exports = { zooUser, Animal };
