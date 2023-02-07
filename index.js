const express = require("express");
const app = express();
require("dotenv").config();
require("./config/config");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
app.use(
  session({
    secret: process.env.secretKey,
    saveUninitialized: false,
    resave: false,
  })
);
const cookie = require("cookie-parser");
app.use(cookie("123456790"));
const passport = require("passport");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

const regsiter_user = require("./routes/userRoutes");
const login_user = require("./routes/userRoutes");
const get_user = require("./routes/userRoutes");
const logout = require("./routes/userRoutes");
app.use("/user", regsiter_user);
app.use("/user", login_user);
app.use("/user", get_user);
app.use("/user", logout);
app.listen(process.env.PORT);
