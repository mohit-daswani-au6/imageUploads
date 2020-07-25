var users = require("../models/user");
module.exports = async (req, res, next) => {
  try {
    if (req.header("Authorization")) {
      const userToken = req.header("Authorization");
      const user = await users.findOne({ where: { token: userToken } });
      if (user) {
        req.user = user;
      }
    } else return res.send("kindly login first");
    next();
  } catch (err) {
    console.log(err.message);
    res.send("kindly login first");
  }
};
