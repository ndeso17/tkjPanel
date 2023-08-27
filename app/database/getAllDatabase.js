// Definisi paket
require("dotenv").config();
const mysql = require("mysql2");

// Mengambil nilai dari variabel lingkungan
const hostname = process.env.DTBS_HOST || "localhost";
const username = process.env.DTBS_USERNAME || "root";
const password =
  process.env.DTBS_PASSWORD !== undefined ? process.env.DTBS_PASSWORD : null;
// const username = "user1";
// const password = "user1";

// Membuat koneksi ke database MySQL
const dtbs = mysql.createConnection({
  host: hostname,
  user: username,
  password: password,
  keepAlive: true,
  // database: "mysql",
});

module.exports = dtbs;
