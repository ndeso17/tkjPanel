const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);
//Modul
const serverStats = require("../../modul/function/serverInfo/serverStats.js");
router.post("/", async (req, res) => {
  const stats = await serverStats();
  return response(200, stats, "Status Server", res);
});

module.exports = router;
