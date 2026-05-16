const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        default: ""
    },
    course: {
        type: String,
        required: [true, "Course is required"],
        trim: true
    },
    year: {
        type: Number,
        min: 1,
        max: 4,
        default: 1
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);
