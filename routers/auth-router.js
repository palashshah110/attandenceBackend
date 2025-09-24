const express = require("express");
const router = express.Router();
// const { home, register, login, adminregister } = require("../controllers/auth-controllers");
const authcontrollers = require("../controllers/auth-controllers")
// Routes
router.route("/Home").get(authcontrollers.home)
router.route("/register").post(authcontrollers.register)
router.route("/login").post(authcontrollers.login)
router.route("/adminregister").post(authcontrollers.adminregister)


// router.post("/register", register);
// router.post("/login", login);
// router.post("/adminregister", adminregister); // admin ka registration bhi yahin

module.exports = router;
