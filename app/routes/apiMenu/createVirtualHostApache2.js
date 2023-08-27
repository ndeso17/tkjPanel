const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Definisi Models
const createVirtualHost = require("../../modul/function/createVirtualHost/analisaInput");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);

router.post("/", async (req, res) => {
  const { passwordSudo, domain } = req.query;
  const virtualHost = await createVirtualHost(passwordSudo, domain);
  response(200, virtualHost, "Hasil Analisa Input", res);
});

module.exports = router;
