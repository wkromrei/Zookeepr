const router = require("express").Router();
const { Animal, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const animalData = await Animal.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const animals = animalData.map((animal) => animal.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("login", {
      animals,
      logged_in: req.isAuthenticated(),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/animal/:id", async (req, res) => {
  try {
    const animalData = await Animal.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const animal = animalData.get({ plain: true });

    res.render("animal", {
      ...animal,
      logged_in: req.isAuthenticated(),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Animal }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.isAuthenticated()) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
