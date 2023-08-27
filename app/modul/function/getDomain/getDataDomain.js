const fs = require("fs");
const path = require("path");
const loginSystem = require("../login");

const getDataDomain = async (passwordSudo) => {
  return new Promise(async (resolve, reject) => {
    const login = await loginSystem(passwordSudo);

    const tPanelDir = "/etc/bind/tPanel";

    try {
      const files = fs.readdirSync(tPanelDir);

      const validFiles = files.filter((file) => {
        const filePath = path.join(tPanelDir, file);
        return (
          file !== "db.empty" &&
          !/\d/.test(file) &&
          fs.statSync(filePath).isFile()
        );
      });

      const domainNames = validFiles.map((file) => file.replace(/^db\./, ""));

      //   const resCallBack = {
      //     status: true,
      //     pesan: "Berhasil mengambil Data dari server!",
      //     domain: domainNames,
      //   };
      resolve(domainNames);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = getDataDomain;
