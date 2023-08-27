const dtbs = require("../../../database/database");
const pushFtpClientData = (pushData) => {
  return new Promise((resolve, reject) => {
    const dataFtpClient = {
      usernameFtp: pushData.usernameFtp,
      cluepwFtp: pushData.cluepwFtp,
      directoryFtp: pushData.rootDirectory,
      hostFtp: pushData.host,
    };
    const sqlInsertData = "INSERT INTO ftpConf SET ?";
    dtbs.query(sqlInsertData, dataFtpClient, (error, results) => {
      if (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const pesanError = `Terjadi kesalahan saat meng-upload ke database. Kode Error = ${errorCode} Pesan Kesalahan = ${errorMessage}`;
        const resCallBack = {
          status: false,
          pesan: pesanError,
        };
        resolve(resCallBack);
      } else {
        const resCallBack = {
          status: true,
          pesan: `Berhasil menyimpan data ftp client ke database.`,
        };
        resolve(resCallBack);
      }
    });
  });
};
module.exports = pushFtpClientData;
