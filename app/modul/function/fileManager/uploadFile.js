const loginSystem = require("../login");
const { exec } = require("child_process");
const uploadFile = (dataInput) => {
  let resCallBack;
  return new Promise(async (resolve, reject) => {
    const login = await loginSystem(dataInput.passwordSudo);
    const statusLogin = login.statusLogin;
    if (!statusLogin) {
      resCallBack = {
        status: false,
        pesan: "Gagal Login Root!",
        data: null,
      };
      resolve(resCallBack);
    } else {
      const originalname = dataInput.originalname;
      const pathFolderFile = dataInput.pathFolderFile;
      const tujuanFolder = dataInput.tujuanFolder;
      const folderTujuan = tujuanFolder + "/" + originalname;

      const moveFile = `sudo mv ${pathFolderFile} '${tujuanFolder}/${originalname}'`;
      const setPermission = `sudo chown www-data:www-data '${tujuanFolder}/${originalname}'`;
      const reloadFtpServer = `sudo systemctl reload vsftpd`;
      const restartFtpServer = `sudo systemctl restart vsftpd`;
      const reloadApacheServer = `sudo systemctl reload apache2`;
      const restartApacheServer = `sudo systemctl restart apache2`;
      const command = `${moveFile} && ${setPermission} && ${reloadFtpServer} && ${reloadApacheServer} && ${restartFtpServer} && ${restartApacheServer}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          resCallBack = {
            status: false,
            pesan: `File gagal disimpan.`,
            data: error,
          };
          resolve(resCallBack);
        } else {
          resCallBack = {
            status: true,
            pesan: `File berhasil disimpan.`,
          };
          resolve(resCallBack);
        }
      });
    }
  });
};
module.exports = uploadFile;
