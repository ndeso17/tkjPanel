const { exec } = require("child_process");
const loginSystem = require("../login");
const runCommandCreateUser = (passwordSudo, command, randomToken) => {
  return new Promise(async (resolve, reject) => {
    const login = await loginSystem(passwordSudo);
    // resolve(login);
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
            pesan: `Proses penambahan User MySql gagal, Error : ${error}`,
          };
          resolve(statusRunCommand);
        } else {
          const statusRunCommand = {
            status: true,
            pesan: `Proses penambahan User MySql berhasil, catat token berikut ini karena ini penting!!! Token = ${randomToken}`,
          };
          resolve(statusRunCommand);
        }
      });
    }
  });
};
module.exports = runCommandCreateUser;
