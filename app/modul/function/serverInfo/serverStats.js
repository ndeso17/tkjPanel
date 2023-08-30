const os = require("os");
const memStat = require("mem-stat");
const netStat = require("net-stat");
const getCpuUsage = require("./getCpuUsage");
const getDiskInfo = require("./getDiskInfo");
const getLogServer = require("./getLogServer");
const serverStats = () => {
  return new Promise(async (resolve, reject) => {
    const rawStats = memStat.raw();
    const totalSwapBytes = rawStats.swapTotal;
    const freeSwapBytes = rawStats.swapFree;
    const networkInterfaces = os.networkInterfaces();
    const cpuS = os.cpus();
    const osUptime = os.uptime();
    const osType = os.type();
    const osVersion = os.version();
    const osPlatform = os.platform();
    const osRelease = os.release();
    const allStats = memStat.allStats();
    const totalRam = allStats.total;
    const freeRam = allStats.free;
    const usedRam = totalRam - freeRam;
    const presentaseFreeRam = allStats.freePercent;
    const presentaseUsedRam = allStats.usedPercent;
    //FomatBytes
    const formattedOsUptime = formatUptime(osUptime);
    const formatBytesTotalRam = formatBytes(totalRam);
    const formatBytesTotalFreeRam = formatBytes(freeRam);
    const formatBytesUsedRam = formatBytes(usedRam);
    //Format Presentase
    // Round the percentages to two decimal places Format as percentages RAM
    const roundedFreeRamPercentage = presentaseFreeRam.toFixed(2);
    const roundedUsedRamPercentage = presentaseUsedRam.toFixed(2);
    const formattedFreeRamPercentage = `${roundedFreeRamPercentage}%`;
    const formattedUsedRamPercentage = `${roundedUsedRamPercentage}%`;
    // Calculate percentages Format percentages SWAP
    const usedSwapPercentage =
      ((totalSwapBytes - freeSwapBytes) / totalSwapBytes) * 100;
    const freeSwapPercentage = 100 - usedSwapPercentage;
    const totalSwapGB = (totalSwapBytes / (1024 * 1024)).toFixed(2);
    const freeSwapGB = (freeSwapBytes / (1024 * 1024)).toFixed(2);
    const usedSwap = totalSwapBytes - freeSwapBytes;
    const usedSwapGB = (usedSwap / (1024 * 1024)).toFixed(2);
    const formattedUsedSwapPercentage = `${usedSwapPercentage.toFixed(2)}%`;
    const formattedFreeSwapPercentage = `${freeSwapPercentage.toFixed(2)}%`;
    //Get CPU Usage
    const modelCpu = cpuS[0].model;
    const speedCpu = cpuS[0].speed;
    const allCoreCpuUsage = await getCpuUsage();
    const formattedCpuUsage = allCoreCpuUsage.map((coreData) => {
      const roundedPercent = coreData.data.percent.toFixed(2);
      const formattedPercent = `${roundedPercent}%`;
      return {
        nomorCore: coreData.nomorCore,
        status: coreData.status,
        data: {
          percent: formattedPercent,
          seconds: coreData.data.seconds,
        },
      };
    });
    const persenCpuUsageCore = formattedCpuUsage.map(
      (coreData) => coreData.data.percent
    );
    //Network Traffic
    const getNetworkTraffic = netStat.raw();
    const networkTrafficData = {};

    Object.keys(getNetworkTraffic).forEach((interfaceName) => {
      const interfaceData = getNetworkTraffic[interfaceName];
      const { bytes, packets, errs, drop } = interfaceData;

      networkTrafficData[interfaceName] = {
        bytes: {
          receive: bytes.receive,
          transmit: bytes.transmit,
        },
        packets: {
          receive: packets.receive,
          transmit: packets.transmit,
        },
        errs: {
          receive: errs.receive,
          transmit: errs.transmit,
        },
        drop: {
          receive: drop.receive,
          transmit: drop.transmit,
        },
      };
    });
    //Disk Information
    const infoDisk = await getDiskInfo();
    const targetMountpoints = ["/", "/home"]; // Mountpoints yang diinginkan

    const selectedDiskInfo = infoDisk.filter((disk) => {
      return targetMountpoints.includes(disk.mountpoint);
    });
    //
    const dataServer = {
      lifeServerUptime: formattedOsUptime,
      tipeOs: osType,
      platformOs: osPlatform,
      versiOs: osVersion,
      releaseOs: osRelease,
      totalRamGb: formatBytesTotalRam,
      totalFreeRamGb: formatBytesTotalFreeRam,
      totalFreeRamPersen: formattedFreeRamPercentage,
      totalUsedRamGb: formatBytesUsedRam,
      totalUsedRamPersen: formattedUsedRamPercentage,
      totalSwap: totalSwapGB,
      freeSwap: freeSwapGB,
      usedSwap: usedSwapGB,
      presentaseFreeSwap: formattedFreeSwapPercentage,
      presentaseUsedSwap: formattedUsedSwapPercentage,
      modelCpu: modelCpu,
      speedCpuAllCore: speedCpu,
      infoCpus: persenCpuUsageCore,
      networkTraffic: networkTrafficData,
      infoNetwork: networkInterfaces,
      infoDisk: selectedDiskInfo,
    };
    resolve(dataServer);
  });
};

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours} jam, ${minutes} menit, ${remainingSeconds.toFixed(2)} detik`;
}

module.exports = serverStats;
