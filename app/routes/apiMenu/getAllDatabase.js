const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
// Module
const koneksi = require("../../database/getAllDatabase");
// Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);

router.post("/", (req, res) => {
  let resCallback;

  koneksi.query("SHOW DATABASES", (error, dbResults) => {
    if (error) {
      console.error("Terjadi error:", error);
      resCallback = {
        status: false,
        pesan: "Gagal Mengambil List Database",
        eror: error,
      };
      response(400, resCallback, "Get Database", res);
    } else {
      const filteredDatabases = dbResults.filter(
        (dbName) =>
          ![
            "information_schema",
            "mysql",
            "performance_schema",
            "sys",
            "phpmyadmin",
          ].includes(dbName.Database)
      );
      const databaseNames = filteredDatabases.map((db) => db.Database);

      // Ambil nama pengguna yang memiliki akses ke database
      koneksi.query(
        "SELECT DISTINCT User FROM mysql.db",
        (userError, userResults) => {
          if (userError) {
            console.error("Terjadi error:", userError);
            resCallback = {
              status: false,
              pesan: "Gagal Mengambil Nama Pengguna",
              eror: userError,
            };
            response(400, resCallback, "Get Users", res);
          } else {
            const userNames = userResults.map((user) => user.User);
            const filteredUserNames = userNames.filter((userName) => {
              const unwantedUsers = [
                "mysql.session",
                "mysql.sys",
                "phpmyadmin",
              ];
              return !unwantedUsers.includes(userName);
            });
            const databaseCondition = databaseNames
              .map((dbName) => `Db = '${dbName}'`)
              .join(" OR ");
            const userCondition = filteredUserNames
              .map((userName) => `User = '${userName}'`)
              .join(" OR ");

            const sql = `SELECT Host, Db, User FROM mysql.db WHERE (${databaseCondition}) AND (${userCondition})`;
            koneksi.query(sql, (getDbUserError, getDbUserResults) => {
              if (getDbUserError) {
                console.error("Terjadi error:", getDbUserError);
                resCallback = {
                  status: false,
                  pesan: "Gagal Mengambil Nama Pengguna",
                  eror: getDbUserError,
                };
                response(400, resCallback, "Get Users", res);
              } else {
                const resultGetDb = getDbUserResults;
                const hostToDbMap = {}; // Objek untuk menyimpan pemetaan Host ke Db

                getDbUserResults.forEach((result) => {
                  const { Host, User, Db } = result;
                  if (!hostToDbMap[User]) {
                    hostToDbMap[User] = [];
                  }
                  hostToDbMap[User].push({
                    host: Host,
                    user: User,
                    database: Db,
                  });
                });

                resCallback = {
                  status: true,
                  pesan: "Berhasil Mengambil List Database dan Nama Pengguna",
                  databases: databaseNames,
                  dbUser: hostToDbMap,
                };
                response(201, resCallback, "Get Database and Users", res);
              }
            });
          }
        }
      );
    }
  });
});

module.exports = router;
