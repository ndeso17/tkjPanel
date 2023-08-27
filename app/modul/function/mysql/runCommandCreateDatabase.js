const { exec } = require("child_process");
const loginSystem = require("../login");
const runCommandCreateDatabase = (passwordSudo, command) => {
  return new Promise(async (resolve, reject) => {
    const login = await loginSystem(passwordSudo);
    const statusLogin = login.statusLogin;
    if (!statusLogin) {
      const statusRunCommand = {
        status: false,
        pesan: `Root Gagal Dibuka`,
      };
      resolve(statusRunCommand);
    } else {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          const statusRunCommand = {
            status: false,
            pesan: `Proses pembuatan database gagal, Error : ${error}`,
          };
          resolve(statusRunCommand);
        } else {
          const statusRunCommand = {
            status: true,
            pesan: `Proses pembuatan database berhasil.`,
          };
          resolve(statusRunCommand);
        }
      });
    }
  });
};
module.exports = runCommandCreateDatabase;
