const { exec } = require("child_process");
const eksekusiCommand = (command, domain) => {
  return new Promise((resolve, reject) => {
    // const dataNewDomain = {
    //   perintah: command,
    //   domain: domain,
    //   pesan: "Ini Eksekusi Command Create New Domain With PTR",
    // };
    // resolve(dataNewDomain);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        const statusPengerjaanCopyZonaDomain = {
          status: false,
          pesan: `Record Zone untuk domain ${domain} gagal dibuat, Error : ${error}`,
        };
        resolve(statusPengerjaanCopyZonaDomain);
      } else {
        const statusPengerjaanCopyZonaDomain = {
          status: true,
          pesan: `Record Zone untuk domain ${domain} berhasil dibuat`,
        };
        resolve(statusPengerjaanCopyZonaDomain);
      }
    });
  });
};
module.exports = eksekusiCommand;
