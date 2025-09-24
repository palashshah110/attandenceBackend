const Attendance = require('../models/attandance-model');

const markAttendance = async (req, res) => {
    try {
        const { name, rollno } = req.body;
        console.log("Request Body:", req.body);

        // save to DB
        const newAttendance = await Attendance.create({ name, rollno });

        return res.status(200).json({ msg: "AttAndance marked successfully", data: newAttendance });
    } catch (error) {
        console.error("Error from attendance:", error);
        return res.status(500).json({ msg: "Server error", error: error.message });
    }
}

const getattandance = async (req,res) =>{
    try {
        const record =  await Attendance.find().sort({timestamp: - 1});
        res.status(201).json(record)
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: err.message });
       console.log(error); 
    }
}

module.exports = { markAttendance,getattandance};
