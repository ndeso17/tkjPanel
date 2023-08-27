const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);
//Modul
const editFile = require("../../modul/function/fileManager/editFile.js");
router.post("/", async (req, res) => {
  const { passwordSudo, namaFile, content } = req.body;
  const dataInput = {
    passwordSudo,
    namaFile,
    content,
  };
  const edit = await editFile(dataInput);
  return response(200, edit, "Edit file", res);
});

module.exports = router;
