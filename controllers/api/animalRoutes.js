const router = require("express").Router();
const { Animal } = require("../../models");

// CREATES an animal
router.post("/", async (req, res) => {
  try {
    const newAnimal = await Animal.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newAnimal);
  } catch (err) {
    res.status(400).json(err);
  }
});

//DELETE an animal
router.delete("/:id", async (req, res) => {
  try {
    const animalData = await Animal.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!animalData) {
      res.status(404).json({ message: "No animal found with this id!" });
      return;
    }

    res.status(200).json(animalData);
  } catch (err) {
    console.error("Error deleting animal:", err);
    res.status(500).json(err);
  }
});

module.exports = router;
