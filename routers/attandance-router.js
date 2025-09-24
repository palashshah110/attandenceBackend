const express = require('express');
const router = express.Router();
const { markAttendance, getattandance } = require('../controllers/attandance-controller');

// Student QR scan ke liye POST
router.post("/attandance", markAttendance);

// Admin dashboard ke liye GET
router.get("/attandance", getattandance);

module.exports = router;
