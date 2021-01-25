const fs = require("fs");
const IP = require("ip");
const DF = require("dateformat");
const nodemailer = require("nodemailer");

const config = require("./config.js");

const sendEmail = async (html) => {
    const transport = config.transport;
    const transporter = nodemailer.createTransport(transport);
    const emailOption = config.email;
    emailOption.html = html;
    console.log("sending email ...");
    console.log(html);
    const info = await transporter.sendMail(emailOption);
    console.log(info);
};


let currentIp;
const cachePath = "./cache.json";
if (fs.existsSync(cachePath)) {
    const json = require(cachePath);
    currentIp = json.ip;
}

const checkIp = function() {
    const ip = IP.address();
    if (ip === currentIp) {
        console.log(`IP No Change: ${ip}`);
        return;
    }
    currentIp = ip;
    const json = JSON.stringify({
        ip: ip
    }, null, 2);
    fs.writeFileSync(cachePath, json);
    const now = new Date();
    const date = DF(now, "yyyy-mm-dd HH:MM:ss");
    config.email.subject = `ReportIP: ${ip} (${date})`;
    sendEmail(config.email.subject);
};

const start = function() {
    checkIp();
    setInterval(function() {
        checkIp();
    }, config.pollingInterval);
};

start();
