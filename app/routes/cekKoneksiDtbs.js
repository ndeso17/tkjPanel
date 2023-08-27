const express = require("express");
const router = express.Router();
const response = require("../modul/view/response");
const dtbs = require("../database/database");

router.get("/", (req, res) => {
  dtbs.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return response(500, err, "Koneksi Error", res); // Menggunakan return di sini
    }
    console.log("Connected to database!");

    // Melakukan operasi atau query database di sini

    // dtbs.end((endErr) => {
    //   if (endErr) {
    //     console.error("Error closing database connection:", endErr);
    //     return;
    //   }
    //   console.log("Connection to database closed.");
    // });
  });

  response(200, null, "Koneksi Berhasil", res); // Memindahkan response ke luar dari blok connect
});

module.exports = router;
