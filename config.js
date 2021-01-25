const config = {
    pollingInterval: 60 * 1000,
    transport: {
        host: "",
        port: 25
    },
    email: {
        from: '"ReportIP" <>',
        to: "",
        subject: "",
        html: ""
    }
};

module.exports = config;