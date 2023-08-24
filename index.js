const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();

const passportSetup = require("./passport");
const authRoute = require("./routes/auth");

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["openreplay"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use("/auth", authRoute);

app.listen("5000", () => {
  console.log("server is running!");
});
