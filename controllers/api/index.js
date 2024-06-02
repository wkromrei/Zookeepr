const router = require("express").Router();
const userRoutes = require("./userRoutes");
const animalRoutes = require("./animalRoutes");
const updateRoutes = require("./updateRoute");

router.use("/users", userRoutes);
router.use("/animals", animalRoutes);
router.use("/update", updateRoutes)

module.exports = router;
