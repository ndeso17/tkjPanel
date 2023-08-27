// mysql -h localhost -u username -e "CREATE USER 'nama_user'@'localhost' IDENTIFIED BY 'password_user'; GRANT ALL PRIVILEGES ON nama_database.* TO 'nama_user'@'localhost';"
require("dotenv").config();
const dtbs = require("../../../database/database");
const userMysqlRoot = process.env.DTBS_USERNAME || "root";
const passwordMysqlRoot = process.env.DTBS_USERNAME || "root";
const runCommandCreateDatabase = require("./runCommandCreateDatabase");
const createNewDatabase = (passwordSudo, ownerName, databaseName) => {
  return new Promise(async (resolve, reject) => {
    const dataNewDatabase = {
      databaseName: databaseName,
      userOwner: ownerName,
    };
    const sql = "INSERT INTO mysqld SET ?";
    dtbs.query(sql, dataNewDatabase, async (error, results) => {
      if (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const pesanError = `Terjadi kesalahan saat menyimpan konfigurasi ke database. Kode Error = ${errorCode} Pesan Kesalahan = ${errorMessage}`;
        const resCallBack = {
          status: false,
          pesan: pesanError,
        };
        resolve(resCallBack);
      } else {
        const getHostOwner = `SELECT * FROM mysqlu WHERE userOwner = '${ownerName}'`;
        dtbs.query(getHostOwner, async (err, fields) => {
          if (err) {
            const errorCode = err.code;
            const errorMessage = err.message;
            const pesanError = `Terjadi kesalahan saat mengambil host. Kode Error = ${errorCode} Pesan Kesalahan = ${errorMessage}`;
            const resCallBack = {
              status: false,
              pesan: pesanError,
            };
            resolve(resCallBack);
          } else {
            const host = fields[0].host;
            const command = `mysql -h localhost -u ${userMysqlRoot} -p${passwordMysqlRoot} -e "CREATE DATABASE ${databaseName}; GRANT ALL PRIVILEGES ON ${databaseName}.* TO '${ownerName}'@'${host}'; FLUSH PRIVILEGES;"`;
            const runCommand = await runCommandCreateDatabase(
              passwordSudo,
              command
            );
            resolve(runCommand);
          }
        });
      }
    });
  });
};
module.exports = createNewDatabase;
