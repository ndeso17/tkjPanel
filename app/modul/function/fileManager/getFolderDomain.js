const fse = require("fs-extra");
const path = require("path");
const getAllFiles = (passwordSudo, rootDirectory) => {
  return new Promise(async (resolve, reject) => {
    let subFolderNames;
    let resCallBack;
    const folderPath = path.join("/home/tkjPanel", rootDirectory);
    fse.readdir(folderPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error("Error reading folder:", err);
        return;
      }
      const subFolders = files.filter((file) => file.isDirectory());
      subFolderNames = subFolders.map((subFolder) => subFolder.name);
      console.log("Subfolders:", subFolderNames);
      if (subFolderNames == null) {
        resCallBack = {
          status: false,
          pesan: "Gagal mengambil folder dari domain",
          data: null,
        };
      } else {
        resCallBack = {
          status: true,
          pesan: "Berhasil mengambil folder dari domain",
          data: subFolderNames,
        };
      }
      resolve(resCallBack);
    });
  });
};
module.exports = getAllFiles;
