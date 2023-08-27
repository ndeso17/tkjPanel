const fs = require("fs");
const path = require("path");
const loginSystem = require("../login");

const getAllDomainConf = async (passwordSudo) => {
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

      const fileContents = {};
      const domainArray = []; // Buat array untuk menyimpan domain

      validFiles.forEach((file) => {
        const filePath = path.join(tPanelDir, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const lines = content.split("\n");
        const filteredLines = lines.filter((line) => {
          return (
            line.indexOf("$TTL") === -1 &&
            line.indexOf("@") === -1 &&
            line.indexOf("ns1") === -1 &&
            line.indexOf("ns2") === -1 &&
            line.indexOf(";") === -1
          );
        });

        const fileNameWithoutPrefix = file.replace("db.", "");
        const firstWords = filteredLines.map((line) => {
          const words = line.split("\t");
          return words[0];
        });

        const cleanedFirstWords = firstWords.filter((word) => word !== "");

        fileContents[fileNameWithoutPrefix] = cleanedFirstWords;

        // Gabungkan dengan tanda titik dan tambahkan ke dalam array domain
        cleanedFirstWords.forEach((word) => {
          const domainName = word + "." + fileNameWithoutPrefix;
          domainArray.push(domainName);
        });

        // Tambahkan juga nama file ke dalam array domain
        domainArray.push(fileNameWithoutPrefix);
      });

      const resCallBack = {
        status: true,
        pesan: "Berhasil mengambil Data dari server!",
        domain: domainArray,
      };
      resolve(resCallBack);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = getAllDomainConf;
