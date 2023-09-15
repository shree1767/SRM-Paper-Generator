const express = require("express");
const passport = require("../passport.config");
const router = express.Router();

const { auth, signup, login, logout } = require("../controllers/auth");

router.get("/", passport.authenticate("jwt", { session: false }), auth);
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", passport.authenticate("jwt", { session: false }), logout);

module.exports = router;
