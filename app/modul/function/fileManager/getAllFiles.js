const fse = require("fs-extra");
const path = require("path");
const getAllFiles = (passwordSudo, domain, rootDirectory) => {
  return new Promise(async (resolve, reject) => {
    const getFilesRecursive = async (directory) => {
      const files = [];
      const contents = await fse.readdir(directory);

      for (const item of contents) {
        const itemPath = path.join(directory, item);
        const stats = await fse.stat(itemPath);

        if (stats.isDirectory()) {
          const subFiles = await getFilesRecursive(itemPath);
          files.push(...subFiles);
        } else {
          files.push(itemPath);
        }
      }

      return files;
    };

    // const folder = path.join("/home/tkjPanel", domain, rootDirectory);
    const folder = `/home/tkjPanel/${domain}/${rootDirectory}`;
    const getFiles = await getFilesRecursive(folder);
    const resCallBack = {
      arrayFile: getFiles,
    };
    resolve(resCallBack);
  });
};
module.exports = getAllFiles;
