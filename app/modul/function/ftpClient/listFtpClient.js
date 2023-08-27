const dtbs = require("../../../database/database");
const fs = require("fs");
const path = require("path");
const listFtpClient = () => {
  return new Promise(async (resolve, reject) => {
    let folders;
    let nestedFolders;
    const directoryRoot = `/home/tkjPanel/`;
    fs.readdir(directoryRoot, (err, files) => {
      if (err) {
        console.error("Terjadi kesalahan:", err);
        return;
      }

      folders = files.filter((file) => {
        const filePath = path.join(directoryRoot, file);
        return fs.statSync(filePath).isDirectory() && file.includes(".");
      });

      nestedFolders = {};

      folders.forEach((folder) => {
        const folderPath = path.join(directoryRoot, `${folder}/public_html`);
        const nestedFolderContents = fs
          .readdirSync(folderPath)
          .filter(
            (file) =>
              fs.statSync(path.join(folderPath, file)).isDirectory() &&
              file.includes(".")
          );
        nestedFolders = nestedFolderContents;
      });
    });
    const sqlGetData = `SELECT * FROM ftpConf`;
    dtbs.query(sqlGetData, (error, result) => {
      if (error) {
        const pesanError = error.message;
        const codeError = error.code;
        const pesanCode = `Terjadi kesalahan: Message = ${pesanError}, Error Code = ${codeError}`;
        const resCallBack = {
          status: false,
          pesan: pesanCode,
          datas: null,
        };
        resolve(resCallBack);
      } else {
        const resCallBack = {
          status: true,
          pesan: "Data berhasil didapatkan!",
          datas: result,
          directoryRoot: folders,
          nestedFolders: nestedFolders,
        };
        resolve(resCallBack);
      }
    });
    // const login = await loginSystem(passwordSudo);

    // // Menjalankan perintah untuk mengambil daftar pengguna FTP
    // if (!login.statusLogin) {
    //   const resCallBack = {
    //     status: false,
    //     pesan: "Gagal Membuka Root!",
    //   };
    //   resolve(resCallBack);
    // } else {
    //   // exec("getent passwd", (error, stdout, stderr) => {
    //   //   if (error) {
    //   //     console.error(`Error: ${error.message}`);
    //   //     return;
    //   //   }
    //   //   if (stderr) {
    //   //     console.error(`stderr: ${stderr}`);
    //   //     return;
    //   //   }

    //   //   // Memproses keluaran perintah untuk mendapatkan daftar pengguna FTP
    //   //   const ftpClientList = stdout
    //   //     .trim()
    //   //     .split("\n")
    //   //     .map((line) => {
    //   //       const fields = line.split(":");
    //   //       return fields[0];
    //   //     });
    //   //   // const iniFtpClients = //ambil ftpClientList yang mempunyai nama dengan berawalan ftp_ contoh ada dua nama yaitu ftpClient dan ftp_Client maka yang diambil adalah yang ftp_Client
    //   //   const iniFtpClients = ftpClientList.filter((name) =>
    //   //     name.startsWith("ftp_")
    //   //   );
    //   //   resolve(iniFtpClients);
    //   // });

    // }
  });
};
module.exports = listFtpClient;
