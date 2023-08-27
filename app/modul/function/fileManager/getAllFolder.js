const fse = require("fs-extra");
const path = require("path");
const getAllFiles = (passwordSudo) => {
  return new Promise(async (resolve, reject) => {
    const folder = "/home/tkjPanel";
    try {
      const contents = await fse.readdir(folder);
      const resCallBack = {
        folder: contents,
      };
      resolve(resCallBack);
    } catch (error) {
      throw error;
    }
  });
};
module.exports = getAllFiles;
