const { exec } = require("child_process");
const dtbs = require("../../../database/database");
const loginSystem = require("../../function/login");
const deleteFtpClient = (dataFtpClient) => {
  return new Promise(async (resolve, reject) => {
    const deleteUser = `sudo deluser ${dataFtpClient.usernameFtp}`;
    const reloadServerFtp = `sudo systemctl reload vsftpd`;
    const restartServerFtp = `sudo systemctl restart vsftpd`;
    const command = `${deleteUser} && ${reloadServerFtp} && ${restartServerFtp}`;
    const login = await loginSystem(dataFtpClient.passwordSudo);
    const statusLogin = login.statusLogin;
    if (!statusLogin) {
      const resCallBack = {
        status: false,
        pesan: "Login Root Error!",
      };
      resolve(resCallBack);
    } else {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          const statusEksekusi = {
            status: false,
            pesan: `FTP Client untuk ${dataFtpClient.usernameFtp} gagal dibuat dari sistem, Error : ${error}`,
          };
          resolve(statusEksekusi);
        } else {
          const sqlDelete = "DELETE FROM ftpConf WHERE usernameFtp = ?";
          const usernameToDelete = dataFtpClient.usernameFtp;
          dtbs.query(sqlDelete, [usernameToDelete], async (error, results) => {
            if (error) {
              const erorCode = error.code;
              const erorMessage = error.message;
              const pesanEror = `Terjadi kesalahan ketika akan menghapus data pada database tetapi user pada sistem berhasil dihapus, Error Code = ${erorCode}, Error Message = ${erorMessage}`;
              const resCallBack = {
                status: false,
                pesan: pesanEror,
              };
              resolve(resCallBack);
            } else {
              const statusEksekusi = {
                status: true,
                pesan: `FTP Client untuk ${dataFtpClient.usernameFtp} berhasil dihapus dari sistem dan database.`,
              };
              resolve(statusEksekusi);
            }
          });
        }
      });
    }
  });
};
module.exports = deleteFtpClient;
