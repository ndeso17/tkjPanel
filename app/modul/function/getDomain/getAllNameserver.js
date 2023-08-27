const fs = require("fs");
const path = require("path");
const loginSystem = require("../login");

const getAllNameserver = async (passwordSudo) => {
  return new Promise(async (resolve, reject) => {
    const login = await loginSystem(passwordSudo);

    const tPanelDir = "/etc/bind/tPanel";

    try {
      const files = fs.readdirSync(tPanelDir);

      const validFiles = files.filter((file) => {
        const filePath = path.join(tPanelDir, file);
        return (
          (file.includes("ns1") || file.includes("ns2")) &&
          file !== "db.empty" &&
          // !/\d/.test(file) &&
          fs.statSync(filePath).isFile()
        );
      });

      const domainNames = validFiles.map((file) => file.replace("db.", ""));

      resolve(domainNames);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = getAllNameserver;
