const fs = require("fs");
const path = require("path");
const loginSystem = require("../login");
const configFolder = "/etc/bind/tPanel";
let resCallBack;
let matchingLines;
const getNameserverConfig = (passwordSudo) => {
  return new Promise(async (resolve, reject) => {
    const login = await loginSystem(passwordSudo);
    const statusLogin = login.statusLogin;
    if (!statusLogin) {
      resCallBack = {
        status: false,
        pesan: "Root gagal dibuka!",
      };
    } else {
      try {
        const files = fs.readdirSync(configFolder);
        const validFiles = files.filter((file) => {
          const filePath = path.join(configFolder, file);
          return (
            (file.includes("ns1") || file.includes("ns2")) &&
            file !== "db.empty" &&
            fs.statSync(filePath).isFile()
          );
        });
        const targetLine = `@\t14400\tIN\tA\t`;
        const lineMatchings = [];
        validFiles.forEach((file) => {
          const filePath = path.join(configFolder, file);
          const fileContent = fs.readFileSync(filePath, "utf-8");
          const lines = fileContent.split("\n");
          matchingLines = lines.filter((line) => line.includes(targetLine));
          if (matchingLines.length > 0) {
            console.log(`File: ${file}`);
            console.log(`Matching Line: ${matchingLines}`);
            console.log("----------------------");
            lineMatchings.push(...matchingLines);
          }
        });
        //buatkan array yang bernama nameserverConf yang berisi validfiles dan lineMatchingnya
        const nameserverConf = validFiles.map((file, index) => {
          const fileNameWithoutDb = file.replace("db.", "");
          const splitLineMatching = lineMatchings[index].split("\t");
          const ipNameserver = splitLineMatching[splitLineMatching.length - 1];
          return {
            nameServer: fileNameWithoutDb,
            ipNameServer: ipNameserver,
          };
        });

        resCallBack = {
          status: true,
          pesan: "Data berhasil didapatkan!",
          data: nameserverConf,
        };
      } catch (error) {
        resCallBack = {
          status: false,
          pesan: "Data gagal didapatkan!",
          data: error,
        };
      }
    }
    resolve(resCallBack);
  });
};
module.exports = getNameserverConfig;
