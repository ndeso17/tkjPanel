const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);
//Module
const renameFiFo = require("../../modul/function/fileManager/renameFiFo.js");
router.post("/", async (req, res) => {
  const { passwordSudo, namaBaru, namaLama, folderPath } = req.body;
  const dataFiFo = {
    passwordSudo,
    namaBaru,
    namaLama,
    folderPath,
  };
  const rename = await renameFiFo(dataFiFo);
  return response(200, rename, "Rename File / Folder", res);
});

module.exports = router;
