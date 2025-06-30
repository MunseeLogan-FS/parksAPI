const express = require("express");

const passport = require("passport");
const passportService = require("../services/passport");
const requireAuth = passport.authenticate("local", { session: false });

const router = express.Router();

const authController = require("../controllers/auth_controller");
const Users = require("../models/Users");

// router.get("/", async (req, res) => {
//   const users = await Users.find({});
//   res.json({
//     message: "Auth API is working properly",
//     users,
//   });
// });
router.post("/signup", authController.signup);
router.post("/signin", requireAuth, authController.signin);

module.exports = router;
