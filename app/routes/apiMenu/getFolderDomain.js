const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
const getFolderDomain = require("../../modul/function/fileManager/getFolderDomain");
//! Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);

router.post("/", async (req, res) => {
  const passwordSudo = req.body.passwordSudo;
  const rootDirectory = req.body.rootDirectory;
  const fileManager = await getFolderDomain(passwordSudo, rootDirectory);
  response(200, fileManager, "File Manager", res);
});
module.exports = router;
