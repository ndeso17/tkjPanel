const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);

router.get("/", (req, res) => {
  const dataTPanel = {
    statusTPanel: "online",
    messageTPanel: "Selamat bersenang-senang tanpa si dia",
  };
  return response(200, dataTPanel, "tPanel siap digunakan", res);
});

module.exports = router;
