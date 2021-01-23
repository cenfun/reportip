const ip = require("ip");
const nodemailer = require("nodemailer");

const option = {
    transport: {
        host: "",
        port: 25
    },
    email: {
        from: "",
        to: "",
        subject: "",
        html: ""
    }
};

const sendEmail = async () => {
    const transport = option.transport;
    const transporter = nodemailer.createTransport(transport);
    const emailOption = option.email;

    emailOption.html = ip.address();

    console.log("sending email ...");
    const info = await transporter.sendMail(emailOption);
    console.log(info);
};

