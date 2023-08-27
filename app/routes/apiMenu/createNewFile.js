const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);
//Modul
const createFile = require("../../modul/function/fileManager/createFile.js");
router.post("/", async (req, res) => {
  const { passwordSudo, namaNewFile, pathFi } = req.body;
  const dataInput = {
    passwordSudo,
    namaNewFile,
    pathFi,
  };
  const createNewFile = await createFile(dataInput);
  return response(200, createNewFile, "Create New File", res);
});

module.exports = router;
