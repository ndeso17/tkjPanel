const express = require("express");
const router = express.Router();
const response = require("../modul/response");
//Definisi Modul
const dtbs = require("../config/database/dtbsKoneksi");

router.get("/", (req, res) => {
  let statusCode;
  let message;
  const sql = `
      SELECT * FROM information_panel
      ORDER BY ABS(TIMESTAMPDIFF(SECOND, updated_at, NOW())), uuid DESC
      LIMIT 1
    `;

  dtbs.query(sql, (error, fields) => {
    if (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.error({
        ErrorGetData: `Pesan Eror = ${errorMessage}, Kode Eror = ${errorCode}`,
      });
    } else {
      const statusPanel = fields[0].status;
      if (statusPanel === "aktif") {
        statusCode = 200;
      } else {
        statusCode = 500;
      }
      const data = "tPanel";
      if (statusCode !== 200) {
        message = `APi tPanel Tidak Tersedia! Error Code = ${statusCode}`;
      } else {
        message = `APi tPanel Siap Digunakan`;
      }
      response(statusCode, data, message, res);
    }
  });
});

module.exports = router;
