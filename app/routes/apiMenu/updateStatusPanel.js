const express = require("express");
const router = express.Router();
//Definisi Paket
const crypto = require("crypto");
const moment = require("moment");
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
//Definisi Modul
const response = require("../modul/response");
const dtbs = require("../config/database/dtbsKoneksi");
const cekUuid = require("../models/cekUUID");

router.put("/", async (req, res) => {
  const { uuid, status } = req.body;
  const hashUUID = (data) => {
    const hash = crypto.createHash("sha256");
    hash.update(data);
    return hash.digest("hex");
  };

  try {
    const isDataExist = await cekUuid(uuid);
    console.log({
      PengecekanUuid: isDataExist.cekUuid,
      DataByUuid: isDataExist.dataByUuid,
    });

    if (!isDataExist.cekUuid) {
      console.log({ cekDataUuid: "STOP" });
    } else {
      console.log({ cekDataUuid: "Lanjutkan" });
      const tokenUuid = isDataExist.dataByUuid[0].token;
      const dataPost = {
        status: status,
        updated_at: currentTime,
      };
      const sqlUpdateData =
        "UPDATE information_panel SET ? WHERE uuid = ? AND token = ?";
      const encryptUUID = hashUUID(uuid); // Tidak perlu didefinisikan di sini, karena sudah didefinisikan di atas
      if (encryptUUID != tokenUuid) {
        response(500, dataPost, "Token Tidak Valid", res);
      } else {
        dtbs.query(
          sqlUpdateData,
          [dataPost, uuid, tokenUuid],
          (error, results) => {
            if (error) {
              const errorCode = error.code;
              const errorMessage = error.message;
              const dataError = { errorCode, errorMessage };
              const pesanError = `Terjadi kesalahan saat meng-upload ke database. Kode Error = ${errorCode} Pesan Kesalahan = ${errorMessage}`;
              console.log(pesanError);
              response(500, dataError, pesanError, res);
            } else {
              response(200, dataPost, "Ini Data Yang Diperbarui", res);
            }
          }
        );
      }
    }
  } catch (error) {
    console.error(error.message);
  }
});
module.exports = router;
