const router = require("express").Router();
const { User } = require("../../models");
const passport = require("passport");

router.post("/", async (req, res) => {
  try {
    console.log("<<<<<<<loading route>>>>>>>>>");
    const userData = await User.create(req.body);
    req.login(userData, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(204).end();
  });
});

module.exports = router;
