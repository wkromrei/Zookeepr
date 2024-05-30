const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

require("./utils/passport");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Initialize session middleware
app.use(session(sess));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Import and use routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
