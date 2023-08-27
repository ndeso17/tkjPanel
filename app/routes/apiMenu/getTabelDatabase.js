const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);
//Modul
const getTabelDatabase = require("../../modul/function/mysql/getTabelDatabase");
router.post("/", async (req, res) => {
  const database = await getTabelDatabase();
  //   const dataTPanel = {
  //     statusTPanel: "online",
  //     messageTPanel: "Selamat bersenang-senang tanpa si dia",
  //     database: database,
  //   };
  response(200, database, "tPanel siap digunakan", res);
});

module.exports = router;
