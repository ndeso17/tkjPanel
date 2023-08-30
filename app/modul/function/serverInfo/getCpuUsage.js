const cpuStat = require("cpu-stat");

const getCpuUsage = async () => {
  const cpuUsagePromises = [];

  for (let coreIndex = 0; coreIndex < cpuStat.totalCores(); coreIndex++) {
    cpuUsagePromises.push(
      new Promise((resolve, reject) => {
        cpuStat.usagePercent({ coreIndex }, function (err, percent, seconds) {
          if (err) {
            const dataCpuStat = {
              nomorCore: coreIndex,
              status: false,
              data: err,
            };
            resolve(dataCpuStat);
          } else {
            const dataCpuStat = {
              nomorCore: coreIndex,
              status: true,
              data: { percent, seconds },
            };
            resolve(dataCpuStat);
          }
        });
      })
    );
  }

  const cpuUsageResults = await Promise.all(cpuUsagePromises);
  return cpuUsageResults;
};

module.exports = getCpuUsage;
