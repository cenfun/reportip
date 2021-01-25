const path = require("path");
const Service = require("node-windows").Service;

// Create a new service object
const svc = new Service({
    name: "ReportIP",
    description: "The ReportIP web server.",
    script: path.resolve(__dirname, "index.js"),
    nodeOptions: [
        "--harmony",
        "--max_old_space_size=4096"
    ]
    //, workingDirectory: '...'
    //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function() {
    svc.start();
});

svc.install();