const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
const getAllFiles = require("../../modul/function/fileManager/getAllFiles.js");
//! Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);

router.post("/", async (req, res) => {
  const passwordSudo = req.body.passwordSudo;
  const domain = req.body.domain;
  const rootDirectory = req.body.rootDirectory;
  const fileManager = await getAllFiles(passwordSudo, domain, rootDirectory);
  response(200, fileManager, "File Manager", res);
});
module.exports = router;
