const dtbs = require("../../database/database");
const cekUsernameEmail = (username, email) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT COUNT(*) AS totalUser, MAX(created_at) FROM users WHERE username = ? AND email = ?`;
    dtbs.query(sql, [username, email], (error, results) => {
      if (error) {
        const pesanError = error.message;
        const codeError = error.code;
        const pesanCode = `Terjadi kesalahan: Message = ${pesanError}, Error Code = ${codeError}`;
        console.error(pesanCode);
        reject(error);
      } else {
        const totalUser = results[0].totalUser;
        let cekUsernameDanEmail;
        if (totalUser > 0) {
          cekUsernameDanEmail = true;
        } else {
          cekUsernameDanEmail = false;
        }
        resolve(cekUsernameDanEmail);
      }
    });
  });
};
module.exports = cekUsernameEmail;
