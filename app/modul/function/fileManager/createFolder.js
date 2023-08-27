const loginSystem = require("../login");
const { exec } = require("child_process");
const createFolder = (dataInput) => {
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
      const targetFiFo = dataInput.pathFo.replace(/'/g, "\\'");
      const namaNewFolder = dataInput.namaNewFolder;
      const replaceContent = `sudo mkdir '${targetFiFo}/${namaNewFolder}'`;
      const reloadFtpServer = `sudo systemctl reload vsftpd`;
      const restartFtpServer = `sudo systemctl restart vsftpd`;
      const reloadApacheServer = `sudo systemctl reload apache2`;
      const restartApacheServer = `sudo systemctl restart apache2`;
      const command = `${replaceContent} && ${reloadFtpServer} && ${reloadApacheServer} && ${restartFtpServer} && ${restartApacheServer}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          resCallBack = {
            status: false,
            pesan: `Folder gagal dibuat.`,
            data: error,
          };
          resolve(resCallBack);
        } else {
          resCallBack = {
            status: true,
            pesan: `Folder berhasil dibuat.`,
          };
          resolve(resCallBack);
        }
      });
    }
  });
};
module.exports = createFolder;
