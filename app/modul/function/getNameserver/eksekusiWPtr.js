const { exec } = require("child_process");
const eksekusiWPtr = (command, nameserver) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        const statusEksekusiWPtr = {
          status: false,
          pesan: `Record untuk nameserver ${nameserver} gagal dibuat, Error : ${error}`,
        };
        resolve(statusEksekusiWPtr);
      } else {
        const statusEksekusiWPtr = {
          status: true,
          pesan: `Record untuk nameserver ${nameserver} berhasil dibuat`,
        };
        resolve(statusEksekusiWPtr);
      }
    });
  });
};
module.exports = eksekusiWPtr;
