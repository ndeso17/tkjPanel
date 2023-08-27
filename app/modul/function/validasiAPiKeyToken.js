require("dotenv").config();
const jwt = require("jsonwebtoken");
let nama;
let username;
let kelas;
let diBuatPadaTanggal;
let kadaluarsaPadaTanggal;
const validasiAPiKeyToken = (secretKey, token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        resolve(err);
      } else {
        nama = decoded.nama;
        username = decoded.username;
        kelas = decoded.kelas;

        diBuatPadaTanggal = new Date(decoded.iat * 1000);
        kadaluarsaPadaTanggal = new Date(decoded.exp * 1000);

        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        };

        const dataToken = {
          nama,
          username,
          kelas,
          diBuatPadaTanggal: diBuatPadaTanggal.toLocaleString(
            undefined,
            options
          ),
          kadaluarsaPadaTanggal: kadaluarsaPadaTanggal.toLocaleString(
            undefined,
            options
          ),
          statusToken: true,
        };
        resolve(dataToken);
      }
    });
  });
};
module.exports = validasiAPiKeyToken;
