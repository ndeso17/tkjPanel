const loginSystem = require("../login");
const { exec } = require("child_process");
const renameFiFo = (dataFiFo) => {
  let resCallBack;
  return new Promise(async (resolve, reject) => {
    const login = await loginSystem(dataFiFo.passwordSudo);
    const statusLogin = login.statusLogin;
    if (!statusLogin) {
      resCallBack = {
        status: false,
        pesan: "Gagal Login Root!",
        data: null,
      };
      resolve(resCallBack);
    } else {
      const namaLama = dataFiFo.namaLama;
      const namaBaru = dataFiFo.namaBaru;
      const folderPath = dataFiFo.folderPath;
      if (namaLama === namaBaru) {
        resCallBack = {
          status: false,
          pesan:
            "Nama tidak valid, tidak ada pperubahan pada nama baru dengan nama lama!",
          data: null,
        };
        resolve(resCallBack);
      } else {
        const oldNameFiFo = folderPath + "/" + namaLama;
        const newNameFiFo = folderPath + "/" + namaBaru;
        const renameFiFoCommand = `sudo mv '${oldNameFiFo}' '${newNameFiFo}'`;
        const reloadFtpServer = `sudo systemctl reload vsftpd`;
        const restartFtpServer = `sudo systemctl restart vsftpd`;
        const reloadApacheServer = `sudo systemctl reload apache2`;
        const restartApacheServer = `sudo systemctl restart apache2`;
        const command = `${renameFiFoCommand} && ${reloadFtpServer} && ${reloadApacheServer} && ${restartFtpServer} && ${restartApacheServer}`;
        exec(command, (error, stdout, stderr) => {
          if (error) {
            resCallBack = {
              status: false,
              pesan: `Fila saat ini gagal diganti namanya dari ${namaLama} menjadi ${namaBaru}`,
              data: folderPath,
            };
            resolve(resCallBack);
          } else {
            resCallBack = {
              status: true,
              pesan: `Fila saat ini telah diganti namanya dari ${namaLama} menjadi ${namaBaru}`,
              data: folderPath,
            };
            resolve(resCallBack);
          }
        });
      }
    }
  });
};
module.exports = renameFiFo;
