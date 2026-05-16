const Student = require("../models/Student");

const handleControllerError = (res, error) => {
    if (error.name === "ValidationError") {
        return res.status(400).json({ message: error.message });
    }

    if (error.code === 11000) {
        return res.status(409).json({ message: "A student with this email already exists" });
    }

    return res.status(500).json({ message: error.message || "Server error" });
};

// Get All Students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.json(students);
    } catch (error) {
        handleControllerError(res, error);
    }
};

// Get Single Student
exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        handleControllerError(res, error);
    }
};

// Add Student
exports.addStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        handleControllerError(res, error);
    }
};

// Update Student
exports.updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(updatedStudent);
    } catch (error) {
        handleControllerError(res, error);
    }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student deleted" });
    } catch (error) {
        handleControllerError(res, error);
    }
};
