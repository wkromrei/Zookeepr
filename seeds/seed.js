const sequelize = require("../config/connection");
const { User, Animal } = require("../models");

const userData = require("./userData.json");
const animalData = require("./animalData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const animal of animalData) {
    await Animal.create({
      ...animal,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
