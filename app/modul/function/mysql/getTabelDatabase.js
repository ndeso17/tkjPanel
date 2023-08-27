const koneksi = require("../../../database/database");
const getTabelDatabase = () => {
  return new Promise((resolve) => {
    const sqlGetOwner = `SELECT * FROM mysqlu`;
    const sqlGetTabel = `SELECT * FROM mysqld`;
    let resCallback = {};
    let resultsGetOwner;
    let resultsGetTabel;
    koneksi.query(sqlGetOwner, (error, results) => {
      if (error) {
        resCallback = {
          status: false,
          pesan: "Gagal Mengambil List Owner dan Database",
          erorGetOwner: error,
        };
      } else {
        resultsGetOwner = results;
        koneksi.query(sqlGetTabel, (err, fields) => {
          if (err) {
            resCallback = {
              status: false,
              pesan: "Gagal Mengambil List Owner dan Database",
              erorGetTabel: err,
            };
          } else {
            resultsGetTabel = fields;
            if (resultsGetOwner && resultsGetTabel) {
              resCallback = {
                status: true,
                pesan: "Berhasil mendapatkan database dan ownernya.",
                dataOwner: resultsGetOwner,
                dataDatabase: resultsGetTabel,
              };
            } else {
              resCallback = {
                status: false,
                pesan: "Gagal Mengambil List Owner dan Database",
                erorGetOwner: resultsGetOwner,
                erorGetTabel: resultsGetTabel,
              };
            }
          }
          resolve(resCallback);
        });
      }
    });
  });
};
module.exports = getTabelDatabase;
