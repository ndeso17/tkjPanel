const loginSystem = require("../login");
const { exec } = require("child_process");
const editFile = (dataInput) => {
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
      const namaFile = dataInput.namaFile;
      //   const content = dataInput.content;
      const content = dataInput.content.replace(/'/g, "\\'");
      // const replaceContent = `echo '${content}' > ${namaFile}`;
      const replaceContent = `echo '${content}' | sudo tee ${namaFile}`;
      const reloadFtpServer = `sudo systemctl reload vsftpd`;
      const restartFtpServer = `sudo systemctl restart vsftpd`;
      const reloadApacheServer = `sudo systemctl reload apache2`;
      const restartApacheServer = `sudo systemctl restart apache2`;
      const command = `${replaceContent} && ${reloadFtpServer} && ${reloadApacheServer} && ${restartFtpServer} && ${restartApacheServer}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          resCallBack = {
            status: false,
            pesan: `Content File gagal diperbarui.`,
            data: error,
          };
          resolve(resCallBack);
        } else {
          resCallBack = {
            status: true,
            pesan: `Content File berhasil diperbarui.`,
          };
          resolve(resCallBack);
        }
      });
    }
  });
};
module.exports = editFile;
