// mysql -h localhost -u username -e "CREATE USER 'nama_user'@'localhost' IDENTIFIED BY 'password_user'; GRANT ALL PRIVILEGES ON nama_database.* TO 'nama_user'@'localhost';"
require("dotenv").config();
const dtbs = require("../../../database/database");
const userMysqlRoot = process.env.DTBS_USERNAME || "root";
const passwordMysqlRoot = process.env.DTBS_USERNAME || "root";
const runCommandCreateUser = require("./runCommandCreateUser");
const createMysqlUser = (
  passwordSudo,
  host,
  username,
  password,
  ciriPassword
) => {
  return new Promise(async (resolve, reject) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
    const tokenLength = 99;

    const generateRandomToken = (length, characterSet) => {
      let token = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        token += characterSet.charAt(randomIndex);
      }
      return token;
    };

    const randomToken = generateRandomToken(tokenLength, characters);
    const dataNewMySqlUser = {
      userOwner: username,
      kunciUtama: password,
      kunciCiri: ciriPassword,
      token: randomToken,
    };
    const sql = "INSERT INTO mysqlu SET ?";
    dtbs.query(sql, dataNewMySqlUser, async (error, results) => {
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
        const command = `mysql -h localhost -u ${userMysqlRoot} -p${passwordMysqlRoot} -e "CREATE USER '${username}'@'${host}' IDENTIFIED BY '${password}';"`;
        const runCommand = await runCommandCreateUser(
          passwordSudo,
          command,
          randomToken
        );
        resolve(runCommand);
      }
    });
  });
};
module.exports = createMysqlUser;
