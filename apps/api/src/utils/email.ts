// import { env } from "../config/env"

// const nodemailer = require("nodemailer")
// exports.sendEmail = ({ email, subject, message }: { email: String, subject: string, message: string }) => new Promise(async (resolve, reject) => {
//     try {
//         const transport = nodemailer.createTransport({
//             service: "gmail",
//             auth: { user: env.email, pass: env.email_pass }
//         })
//         await transport.sendMail({
//             to: email,
//             subject: subject,
//             html: message
//         })
//         resolve("email send success")

//     } catch (error) {
//         console.log(error)
//         reject("unable to send email")
//     }
// })



import nodemailer from "nodemailer";
import { env } from "../config/env";

type SendEmailParams = {
    email: string;
    subject: string;
    message: string;
};

export const sendEmail = async ({
    email,
    subject,
    message,
}: SendEmailParams): Promise<string> => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: env.email,
                pass: env.email_pass,
            },
        });

        await transporter.sendMail({
            from: env.email,
            to: email,
            subject,
            html: message,
        });

        return "email sent successfully";
    } catch (error) {
        console.error(error);
        throw new Error("Unable to send email");
    }
};