const express = require("express");

const routes = express.Router();
const auth = require("../middleware/auth");

const {
  regsiter_user,
  login_user,
  get_user,
  logout,
} = require("../controller/userController");

routes.post("/regsiter_user", regsiter_user);
routes.post("/login_user", login_user);
routes.get("/get_user", auth, get_user);
routes.post("/logout", logout);
module.exports = routes;
