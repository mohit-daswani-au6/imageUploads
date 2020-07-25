const users = require("../models/user");
const { verify } = require("jsonwebtoken");
module.exports = {
  post: {
    //--------------------------------------------------------login user logic
    async login_user(req, res) {
      try {
        const { email, password } = req.body;
        if (!email || !password)
          return res.status(400).send("Incorrect Credentials");
        const user = await users.find_by_email_and_password(email, password);
        const accesToken = await user.generateToken();
        res.status(201).json({
          statusCode: 201,
          token: accesToken,
        });
      } catch (err) {
        console.log(err.message);
        if (err.message == "Incorrect Credentials")
          return res.status(400).send("Invalid Credentials");
        return res.send("ServerError");
      }
    },
    //--------------------------------------------------------register user logic
    async register_user(req, res) {
      try {
        let user = req.body;
        const { email, password, name } = user;
        if (!email || !password || !name)
          return res.status(400).send("ValidationError");
        const NewUser = await users.create(user);
        NewUser.resetToken = null;
        token = await NewUser.generateToken();
        setTimeout(() => {
          res.status(201).json({ statusCode: 201, NewUser });
        }, 3000);
      } catch (err) {
        console.log(err);
        if (err.name === "ValidationError")
          return res.status(400).send(`Validation Error: ${err.message}`);
        return res.status(500).send("serverError");
      }
    }
},
  delete1: {
    //------------------------------------------------------------------------user logout logic
    async logout_user(req, res) {
      try {
        token = req.params.userToken;
        const user = await users.nullifyToken(token);
        res.json(user);
      } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
      }
    },
  },
}
