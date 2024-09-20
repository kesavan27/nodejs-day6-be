import nodemailer from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.GMAIL,
        pass:process.env.GMAIL_PASSWORD
    }
});

const mailOptions={
    from: process.env.GMAIL,
    to:[],
    subject:"Data Added",
    text:"Your data added successfully"
};

export {transport,mailOptions};