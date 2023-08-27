const { exec } = require("child_process");
const loginSystem = require("../../function/login");
const eksekusiCommand = (command, usernameFtp, passwordSudo) => {
  return new Promise(async (resolve, reject) => {
    const login = await loginSystem(passwordSudo);
    const statusLogin = login.statusLogin;
    if (!statusLogin) {
      const resCallBack = {
        pesan: "Gagal membuka root!",
        status: false,
      };
      resolve(resCallBack);
    } else {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          const statusEksekusi = {
            status: false,
            pesan: `FTP Client untuk ${usernameFtp} gagal dibuat, Error : ${error}`,
          };
          resolve(statusEksekusi);
        } else {
          const statusEksekusi = {
            status: true,
            pesan: `FTP Client untuk ${usernameFtp} berhasil dibuat`,
          };
          resolve(statusEksekusi);
        }
      });
    }
  });
};
module.exports = eksekusiCommand;
