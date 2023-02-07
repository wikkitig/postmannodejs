const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.my_db, (err) => {
  if (err) {
    console.log("cannot connect" + err);
  } else {
    console.log("connection established");
  }
});

module.exports.mongoose;
