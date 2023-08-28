const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();

const passportSetup = require("./passport");
const authRoute = require("./routes/auth");

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["openreplay"],
    maxAge: 24 * 60 * 60 * 1000, // Corrected value (in milliseconds)
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Corrected: Removed trailing slash
    credentials: true, // Allow credentials (cookies, etc.) to be sent
  })
);

app.use("/auth", authRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000!");
});
