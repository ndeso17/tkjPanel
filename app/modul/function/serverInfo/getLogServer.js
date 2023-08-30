// const fs = require("fs");
// const events = require("events");

// const apacheLogPath = "/var/log/apache2/access.log";
// const bindLogPath = "/var/log/syslog";
// const mysqlLogPath = "/var/log/mysql/error.log";

// const getLogServer = () => {
//   return new Promise((resolve, reject) => {
//     const eventEmitter = new events.EventEmitter();

//     function readLastLine(logPath, logType) {
//       fs.readFile(logPath, "utf8", (err, data) => {
//         if (err) {
//           console.error(`Error reading ${logType} log file:`, err);
//           return;
//         }

//         const lines = data.trim().split("\n");
//         const lastLine = lines[lines.length - 1];
//         eventEmitter.emit("newLog", logType, lastLine);
//       });
//     }

//     fs.watch(apacheLogPath, (event, filename) => {
//       if (filename && event === "change") {
//         readLastLine(apacheLogPath, "Apache");
//       }
//     });

//     fs.watch(bindLogPath, (event, filename) => {
//       if (filename && event === "change") {
//         readLastLine(bindLogPath, "BIND9");
//       }
//     });

//     fs.watch(mysqlLogPath, (event, filename) => {
//       if (filename && event === "change") {
//         readLastLine(mysqlLogPath, "MySQL");
//       }
//     });

//     readLastLine(apacheLogPath, "Apache");
//     readLastLine(bindLogPath, "BIND9");
//     readLastLine(mysqlLogPath, "MySQL");

//     eventEmitter.on("newLog", (logType, logLine) => {
//       const resCallBack = `New ${logType} log: ${logLine}`;
//       resolve(resCallBack);
//     });
//   });
// };

// module.exports = getLogServer;
const fs = require("fs");
const events = require("events");
const fluentLogger = require("fluent-logger");

fluentLogger.configure({
  host: "localhost", // Ganti dengan alamat host Fluentd
  port: 24224, // Ganti dengan port Fluentd
  timeout: 3.0,
  reconnectInterval: 600000, // Reconnect setiap 10 menit
});

const apacheLogPath = "/var/log/apache2/access.log";
const bindLogPath = "/var/log/syslog";
const mysqlLogPath = "/var/log/mysql/error.log";

const getLogServer = () => {
  return new Promise((resolve, reject) => {
    const eventEmitter = new events.EventEmitter();

    function readLastLine(logPath, logType) {
      fs.readFile(logPath, "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading ${logType} log file:`, err);
          return;
        }

        const lines = data.trim().split("\n");
        const lastLine = lines[lines.length - 1];
        sendLog(logType, lastLine); // Mengirim log ke Fluentd
        eventEmitter.emit("newLog", logType, lastLine);
      });
    }

    fs.watch(apacheLogPath, (event, filename) => {
      if (filename && event === "change") {
        readLastLine(apacheLogPath, "Apache");
      }
    });

    fs.watch(bindLogPath, (event, filename) => {
      if (filename && event === "change") {
        readLastLine(bindLogPath, "BIND9");
      }
    });

    fs.watch(mysqlLogPath, (event, filename) => {
      if (filename && event === "change") {
        readLastLine(mysqlLogPath, "MySQL");
      }
    });

    readLastLine(apacheLogPath, "Apache");
    readLastLine(bindLogPath, "BIND9");
    readLastLine(mysqlLogPath, "MySQL");

    eventEmitter.on("newLog", (logType, logLine) => {
      //   console.log(`New ${logType} log:`, logLine);
      // Di sini Anda bisa melakukan sesuatu dengan logLine sesuai kebutuhan
      const resCallBack = `New ${logType} log: ${logLine}`;
      resolve(resCallBack);
    });
  });
};

function sendLog(logType, logMessage) {
  fluentLogger.emit(logType, { message: logMessage });
}

module.exports = getLogServer;
