const IP = require("ip");
const DF = require("dateformat");
const nodemailer = require("nodemailer");

const option = {
    pollingInterval: 5 * 1000,
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

const sendEmail = async (html) => {
    const transport = option.transport;
    const transporter = nodemailer.createTransport(transport);
    const emailOption = option.email;
    emailOption.html = html;
    console.log("sending email ...");
    const info = await transporter.sendMail(emailOption);
    console.log(info);
};

let currentIp;
const checkIp = function() {
    const ip = IP.address();
    if (ip === currentIp) {
        return;
    }
    currentIp = ip;
    const now = new Date();
    const date = DF(now, "yyyy-mm-dd HH:MM:ss");
    option.email.subject = `IP:${ip} ${date}`;
    sendEmail(option.email.subject);
};

const start = function() {
    checkIp();
    setInterval(function() {
        checkIp();
    }, option.pollingInterval);
};

start();
