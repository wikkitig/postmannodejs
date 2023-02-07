const bcrypt = require("bcrypt");
const passport = require("passport");
const user = require("../models/userSchema");
const regsiter_user = async (req, res) => {
  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.mobilenumber ||
    !req.body.password
  ) {
    res.status(400).json("Enter all fields");
  }
  try {
    const emailCheck = await user.find({ mobilenumber: req.body.email });

    if (emailCheck.length == 0) {
      const hashed_password = await bcrypt.hash(req.body.password, 10);
      const user_datas = await new user({
        username: req.body.username,
        email: req.body.email,
        password: hashed_password,
        mobilenumber: req.body.mobilenumber,
      });
      console.log(user_datas);
      await user_datas.save();
      res.status(200).json("user registered");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const login_user = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.status(404).json(" user not found");
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).json("Successfully Authenticated");
        console.log("auth");
        console.log(req.user);
        console.log("auth");
      });
    }
  })(req, res, next);
};

const get_user = async (req, res) => {
  const total_users = await user.find();
  console.log(req.user);
  console.log(req.session);
  res.status(400).json(total_users);
};

const logout = (req, res) => {
  req.session.destroy();
  res.status(200).json(" you are logged out");
};
module.exports = { regsiter_user, login_user, get_user, logout };
