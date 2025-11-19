const express = require('express');
const router = express.Router();
const { markAttendance, getattandance, getattandanceByRollno } = require('../controllers/attandance-controller');

// Student QR scan ke liye POST
router.post("/attandance", markAttendance);

// Admin dashboard ke liye GET
router.get("/attandance", getattandance);

// Admin dashboard ke liye GET (specific rollno)
router.get("/attendance/:rollno", getattandanceByRollno);
module.exports = router;
