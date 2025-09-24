const { log } = require('console');
const User = require('../models/users.model')
// Home page
const home = async (req, res) => {
  res.send("Welcome to Home Page");
};

// Register user
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password,rollno, department, userType} = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "User already exists" });

    const newUser = await User.create({
      name,
      email,
      password,
      rollno,
      department: userType === "admin" ? department : undefined,
      userType
    });

    res.status(200).json({ message: "User created", data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    if (user.password !== password) return res.status(400).json({ msg: "Invalid credentials" });

    res.status(200).json({
      msg: "Login successful",
      userType: user.userType,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Admin Register page (for admin only)
const adminregister = async (req, res) => {
  try {
    const { name, email, password, department, userType } = req.body;

    const isExist = await User.findOne({email})
    if(isExist){
      console.log(req.body);
      return res.status(400).json({msg:"already exist.."})
}
const newUser = await User.create({
  name,
  email,
  password,
  department: userType === "admin" ? department : undefined,
  userType,
});

res.status(201).json({   msg: "Admin created successfully", FormData});
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error..." });

  }
};

module.exports = { home, register, login, adminregister };
