const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);
//Modul
const createFolder = require("../../modul/function/fileManager/createFolder.js");
router.post("/", async (req, res) => {
  const { passwordSudo, namaNewFolder, pathFo } = req.body;
  const dataInput = {
    passwordSudo,
    namaNewFolder,
    pathFo,
  };
  const createNewFolder = await createFolder(dataInput);
  return response(200, createNewFolder, "Create New Folder", res);
});

module.exports = router;
