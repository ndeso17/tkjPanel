const { exec } = require("child_process");
const loginSystem = require("../login");
const setupWp = (passwordSudo, command, domain) => {
  return new Promise(async (resolve, reject) => {
    const login = await loginSystem(passwordSudo);
    // resolve(login);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        const statusInstalasi = {
          status: false,
          pesan: `Proses instalasi Wordpress untuk ${domain} gagal, Error : ${error}`,
        };
        resolve(statusInstalasi);
      } else {
        const statusInstalasi = {
          status: true,
          pesan: `Proses instalasi Wordpress untuk ${domain} berhasil`,
        };
        resolve(statusInstalasi);
      }
    });
  });
};
module.exports = setupWp;
