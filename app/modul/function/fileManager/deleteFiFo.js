const loginSystem = require("../login");
const { exec } = require("child_process");
const deleteFiFo = (dataInput) => {
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
      const targetFiFo = dataInput.targetFiFo.replace(/'/g, "\\'");
      const replaceContent = `sudo rm -rf '${targetFiFo}'`;
      const reloadFtpServer = `sudo systemctl reload vsftpd`;
      const restartFtpServer = `sudo systemctl restart vsftpd`;
      const reloadApacheServer = `sudo systemctl reload apache2`;
      const restartApacheServer = `sudo systemctl restart apache2`;
      const command = `${replaceContent} && ${reloadFtpServer} && ${reloadApacheServer} && ${restartFtpServer} && ${restartApacheServer}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          resCallBack = {
            status: false,
            pesan: `File / Folder gagal dihapus.`,
            data: error,
          };
          resolve(resCallBack);
        } else {
          resCallBack = {
            status: true,
            pesan: `File / Folder berhasil dihapus.`,
          };
          resolve(resCallBack);
        }
      });
    }
  });
};
module.exports = deleteFiFo;
