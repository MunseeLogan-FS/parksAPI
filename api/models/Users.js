const req = require("express/lib/request");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const validateEmail = function (email) {
  const check = /^\S+@\S+\.\S+$/;
  return check.test(email);
};

const usersSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "You are required to have an email."],
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, "Please provide a valid email address."],
  },
  password: {
    type: String,
    required: [true, "You are required to have a password."],
    trim: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

usersSchema.pre("save", function (next) {
  const user = this;
  if (user.isNew || user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

usersSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", usersSchema, "users");
