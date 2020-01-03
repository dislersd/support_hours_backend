const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO validate user data
      // TODO make sure user doesnt already exist
      // TODO hash password and create an auth token
      password = await bcrypt.hash(password, 6);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
        role: "student"
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username
        },
        SECRET_KEY,
        { expiresIn: "3h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token
      };
    }
  }
};
