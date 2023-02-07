const auth = (req, res, next) => {
  console.log("test");
  if (req.user) {
    next();
  } else {
    res.status(401).json("Need Token");
  }
};
module.exports = auth;
