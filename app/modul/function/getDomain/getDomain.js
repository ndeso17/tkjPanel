const fs = require("fs");

const getDomain = (domain) => {
  return new Promise((resolve, reject) => {
    const targetPemeriksaan = `/etc/bind/tPanel/db.${domain}`;
    const data = fs.readFileSync(targetPemeriksaan, "utf8");
    const lines = data.split("\n");
    let foundNegativeCache = false;
    let negativeCacheLines = [];

    for (const line of lines) {
      if (line.includes("NS")) {
        foundNegativeCache = true;
      }
      if (foundNegativeCache) {
        negativeCacheLines.push(line);
      }
    }
    // resolve(negativeCacheLines);

    const soaLine = lines.find((line) => line.includes("SOA"));
    const serverDomain = soaLine.match(/SOA\s+(.*?)\s+/)[1];
    const dataDomain = negativeCacheLines.join("\n");

    const dataRecord = {
      serverDomain,
      dataDomain,
    };
    resolve(dataRecord);
  });
};

module.exports = getDomain;
