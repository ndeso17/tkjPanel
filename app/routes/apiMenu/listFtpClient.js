const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
// Middleware
const middlewareAPi = require("../loginAPi");
// Modul
const listFtpClient = require("../../modul/function/ftpClient/listFtpClient");

router.post("/", middlewareAPi, async (req, res) => {
  const { passwordSudo } = req.body;
  const ftpClient = await listFtpClient();
  response(200, ftpClient, "Ftp Client", res);
});

module.exports = router;
