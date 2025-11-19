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

const getattandanceByRollno = async (req, res) => {
    try {
        const { rollno } = req.params;

        // last 5 days including today
        const days = 5;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const fiveDaysAgo = new Date(today);
        fiveDaysAgo.setDate(today.getDate() - (days - 1)); // 5 days range

        // Fetch attendance for the last 5 days
        const attendance = await Attendance.find({
            rollno,
            createdAt: { $gte: fiveDaysAgo }
        });

        // Convert attendance dates to a "YYYY-MM-DD" map
        const presentDates = new Set(
            attendance.map(item =>
                new Date(item.createdAt).toISOString().split("T")[0]
            )
        );

        // Build response object → for each day mark Present/Absent
        let result = [];

        for (let i = 0; i < days; i++) {
            const dateObj = new Date(today);
            dateObj.setDate(today.getDate() - i);

            const dateKey = dateObj.toISOString().split("T")[0];

            result.push({
                date: dateKey,
                status: presentDates.has(dateKey) ? "Present" : "Absent"
            });
        }

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};


module.exports = { markAttendance,getattandance,getattandanceByRollno};
