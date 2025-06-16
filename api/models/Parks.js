const req = require("express/lib/request");
const mongoose = require("mongoose");

const parksSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "You are required to have a park name."],
    unique: [true, "Name must be unique."],
    trim: true,
    maxlength: [
      50,
      "Your name is too long, name cannot be longer than 50 characters.",
    ],
  },
  area: {
    type: Number,
    required: true,
    min: [0, "Area cannot be negative."],
  },
  location: {
    type: String,
    required: [true, "You are required to have a park location."],
    trim: true,
    maxlength: [
      50,
      "Your location is too long, location cannot be longer than 50 characters.",
    ],
  },
  established: {
    type: Date,
    required: [true, "You are required to have a park established date."],
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: "Established date cannot be in the future.",
    },
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Park", parksSchema, "parks");
