require("dotenv").config();
const dtbs = require("../../database/database");
const secretKey = process.env.APP_SECRET_KEY;
const validasiAPiKeyToken = require("./validasiAPiKeyToken");
const userTokenIdentifier = (token) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT COUNT(*) AS totalToken, MAX(created_at) FROM users WHERE token = ?`;
    dtbs.query(sql, [token], async (error, results) => {
      if (error) {
        const pesanError = error.message;
        const codeError = error.code;
        const pesanCode = `Terjadi kesalahan: Message = ${pesanError}, Error Code = ${codeError}`;
        console.error(pesanCode);
        reject(error);
      } else {
        const totalToken = results[0].totalToken;
        let cekUserToken;
        if (totalToken > 0) {
          // cekUserToken = true;
          cekUserToken = await validasiAPiKeyToken(secretKey, token);
        } else {
          cekUserToken = false;
        }
        resolve(cekUserToken);
      }
    });
  });
};
module.exports = userTokenIdentifier;
