// Import packages
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

// App config
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 4001;

// Import Passport config
require("./config/passport");

// Session Config
app.use(
  session({
    secret: "f4z4gs$Gcg",
    cookie: { maxAge: 300000000},
    saveUninitialized: false,
    resave: false,
    samesite: 'none',
    secure: true
  })
);

// Passport Config
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require("./routes/index.routes.js"));

app.get("/", (req, res) => {
  const user = req.user || "Guest";
  res.render("home", { user });
});


app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});


