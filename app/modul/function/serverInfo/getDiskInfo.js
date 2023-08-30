const { exec } = require("child_process");
const getDiskInfo = () => {
  return new Promise((resolve, reject) => {
    exec("df -h", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }

      const outputLines = stdout.split("\n");
      const diskInfo = [];

      for (let i = 1; i < outputLines.length - 1; i++) {
        const columns = outputLines[i].split(/\s+/);
        const device = columns[0];
        const size = columns[1];
        const used = columns[2];
        const available = columns[3];
        const percentUsed = columns[4];
        const mountpoint = columns[5];

        diskInfo.push({
          device,
          size,
          used,
          available,
          percentUsed,
          mountpoint,
        });
      }
      resolve(diskInfo);
    });
  });
};
module.exports = getDiskInfo;
