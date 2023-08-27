const express = require("express");
const router = express.Router();
const response = require("../modul/response");
//Definisi Modul
const dtbs = require("../config/database/dtbsKoneksi");

router.get("/", (req, res) => {
  response(200, null, "Sukses Get 2", res);
});

module.exports = router;
