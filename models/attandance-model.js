const mongoose = require('mongoose');

const attandanceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollno: { type: String, required: true },
},{timestamps:true});

module.exports = mongoose.model("Attandance", attandanceSchema);
