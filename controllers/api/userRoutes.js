const router = require("express").Router();
const { User } = require("../../models");
const passport = require("../../utils/passport");

router.post("/", async (req, res) => {
  try {
    console.log("<<<<<<<loading route>>>>>>>>>");
    const userData = await User.create(req.body);

    const user = userData.get({ plain: true });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(user);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
