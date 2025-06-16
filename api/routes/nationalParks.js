const express = require("express");
const router = express.Router();
const messages = require("../utils/messages");

const Park = require("../models/Parks");

router.get("/", async (req, res) => {
  try {
    const parks = await Park.find({});
    res.status(200).json({
      data: parks,
      success: true,
      message: messages.RETRIEVE_SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.RETRIEVE_ERROR,
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const park = await Park.findById(id);
    if (!park) {
      return res.status(404).json({
        success: false,
        message: messages.NOT_FOUND(id),
      });
    }
    res.status(200).json({
      data: park,
      success: true,
      message: messages.RETRIEVE_SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.RETRIEVE_ERROR,
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const { park } = req.body;
  console.log(park);
  try {
    const newPark = await Park.create(park);
    console.log("data:", newPark);
    res.status(201).json({
      data: newPark,
      success: true,
      message: messages.CREATE_SUCCESS,
    });
  } catch (error) {
    console.log("error:", error);
    if (error.name === "ValidationError") {
      return res.status(422).json({
        success: false,
        message: messages.VALIDATION_ERROR,
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: messages.CREATE_ERROR || "Error creating park",
      error: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const park = await Park.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!park) {
      return res.status(404).json({
        success: false,
        message: messages.NOT_FOUND(id),
      });
    }
    res.status(200).json({
      data: park,
      success: true,
      message: messages.UPDATE_SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.UPDATE_ERROR(id),
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletePark = await Park.findByIdAndDelete(id);
    res.status(200).json({
      data: deletePark,
      success: true,
      message: messages.DELETE_SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.DELETE_ERROR(id),
      error: error.message,
    });
  }
});
module.exports = router;
