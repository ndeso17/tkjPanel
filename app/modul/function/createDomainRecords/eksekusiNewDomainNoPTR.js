const { exec } = require("child_process");
const eksekusiCommand = (command, domain) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        const statusPengerjaanCopyZonaDomain = {
          status: false,
          pesan: `Record Zone untuk Domain ${domain} gagal dibuat, Error : ${error}`,
        };
        resolve(statusPengerjaanCopyZonaDomain);
      } else {
        const statusPengerjaanCopyZonaDomain = {
          status: true,
          pesan: `Record Zone untuk Domain ${domain} berhasil dibuat`,
        };
        resolve(statusPengerjaanCopyZonaDomain);
      }
    });
  });
};
module.exports = eksekusiCommand;
