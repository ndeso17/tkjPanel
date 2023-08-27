const fs = require("fs");
const path = require("path");

const configFolder = "/etc/bind/tPanel";

const nameServerChecker = (nameserver) => {
  return new Promise((resolve, reject) => {
    try {
      const files = fs.readdirSync(configFolder);
      const validFiles = files.filter((file) => {
        const filePath = path.join(configFolder, file);
        return file.includes(nameserver) && fs.statSync(filePath).isFile();
      });

      let resCallBack;

      if (validFiles.length > 0) {
        resCallBack = {
          status: true,
          data: validFiles,
        };
      } else {
        resCallBack = {
          status: false,
          data: null,
        };
      }

      resolve(resCallBack);
    } catch (error) {
      const resCallBack = {
        status: "die",
        data: error,
      };
      resolve(resCallBack);
    }
  });
};

module.exports = nameServerChecker;
