const user = require("../models/Users");
const jwt = require("jwt-simple");
const config = require("../config");

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
};

exports.signin = (req, res, next) => {
  const user = req.user;
  console.log("User signed in:", user.email);
  res.send({
    status: 200,
    user_id: user._id,
    token: tokenForUser(user),
    message: "User signed in successfully.",
  });
};

exports.signup = async (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  user.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const newUser = new user({ email, password });
    if (err) return next(err);
    if (existingUser) {
      return res.status(422).json({ message: "Email already in use." });
    }
    newUser.save((err) => {
      if (err) return next(err);
      res.status(201).json({
        status: 201,
        user_id: newUser._id,
        token: tokenForUser(newUser),
        message: "User created successfully.",
      });
    });
  });
};
