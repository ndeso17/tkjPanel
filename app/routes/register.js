const express = require("express");
const router = express.Router();
const response = require("../modul/view/response");
//Add variabel modul
const encryptPassword = require("../modul/function/pwGenerator");
const getDateNow = require("../modul/function/getDateNow");
const cekUsernameEmail = require("../modul/function/cekUsernameEmail");
const dtbs = require("../database/database");
const generateToken = require("../modul/function/tokenGenerator");

router.post("/", async (req, res) => {
  const { nama, username, email, password } = req.body;
  // const lisensi = "free";
  const lisensi = "lisensiA";
  const payload = {
    nama: nama,
    username: username,
    email: email,
    kelas: lisensi,
  };

  const periksaUsernameEmail = await cekUsernameEmail(username, email);
  if (!periksaUsernameEmail) {
    const encryptedPw = await encryptPassword(password, username);
    const genToken = await generateToken(payload);
    const createdAt = getDateNow();
    const updatedAt = getDateNow();
    const dataUser = {
      nama: nama,
      username: username,
      email: email,
      password: encryptedPw,
      lisensi: lisensi,
      token: genToken,
      created_at: createdAt,
      updated_at: updatedAt,
    };

    const sqlInsertData = "INSERT INTO users SET ?";
    dtbs.query(sqlInsertData, dataUser, (error, results) => {
      if (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const dataError = { errorCode, errorMessage };
        const pesanError = `Terjadi kesalahan saat meng-upload ke database. Kode Error = ${errorCode} Pesan Kesalahan = ${errorMessage}`;
        response(500, dataError, pesanError, res);
      } else {
        response(201, dataUser, "Register berhasil!", res);
      }
    });
  } else {
    const dataUserError = {
      nama: nama,
      username: username,
      email: email,
    };
    response(
      400,
      {
        dataRegister: dataUserError,
        messageRegister:
          "Register ditangguhkan, username / email sudah digunakan",
      },
      "Register Gagal",
      res
    );
  }
});

module.exports = router;
