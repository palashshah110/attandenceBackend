require('dotenv').config()
const express = require("express");
const app = express();
const authRouter = require("./routers/auth-router");  // 👈 yeh line add karo
const AttendanceRouter = require('./routers/attandance-router');
const connectDB = require("./utils/db")
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors())
// Routes
app.use("/", authRouter);
app.use("/", AttendanceRouter);


connectDB().then(() =>{
  app.listen(process.env.PORT || 5003, () => {
    console.log(`✅ Server running at http://localhost:${process.env.PORT || 5003}`);
  });
});