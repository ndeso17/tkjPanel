//Paket
require("dotenv").config();
const appApiKey = process.env.APP_PUBLIC_KEY;
const express = require("express");
const router = express.Router();
const response = require("../modul/view/response");
const userTokenIdentifier = require("../modul/function/userTokenIdentifier");
const formatDate = require("../modul/function/formatDate");

router.post("/", async (req, res, next) => {
  const apiKey = req.query["api-key"];
  const token = req.query["token"];

  if (apiKey != appApiKey) {
    response(401, null, "APi Key yang anda masukkan tidak valid!", res);
  } else {
    // const cekToken = await userTokenIdentifier(token);
    const cekToken = await userTokenIdentifier(token).catch((error) => {
      console.error(error);
      return null;
    });

    if (cekToken.name === "TokenExpiredError") {
      const kadaluarsaToken = cekToken.expiredAt;
      const payloadData = {
        statusToken: "expired",
        tanggalExpired: formatDate(kadaluarsaToken),
      };
      response(403, payloadData, "Token Kadaluarsa!", res);
    } else if (!cekToken) {
      response(404, null, "Token Tidak Terdaftar", res);
    } else {
      if (!cekToken.statusToken) {
        response(401, null, "Token yang anda masukkan tidak valid!", res);
      } else {
        //balangna maring route indexAPi.js
        next();
        // response(201, cekToken, "Welcome To tPanel!", res);
      }
    }
  }
});
module.exports = router;
