import { Schema, model } from "mongoose";

const student = new Schema({
    email:{
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true
    },
    role: {
        type: "string",
        required: true
    },
    studentId:{
        type: "string",
        required: true
    }
});

const studentModel = new model("student", student, "students");

export { studentModel };