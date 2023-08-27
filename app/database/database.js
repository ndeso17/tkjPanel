//Definisi paket
require("dotenv").config();
const mysql = require("mysql2");

// Mengambil nilai dari variabel lingkungan
const hostname = process.env.DTBS_HOST || "localhost";
const username = process.env.DTBS_USERNAME || "root";
const password =
  process.env.DTBS_PASSWORD !== undefined ? process.env.DTBS_PASSWORD : null;
const database =
  process.env.DTBS_DATABASE !== undefined ? process.env.DTBS_DATABASE : null;

// Membuat koneksi ke database MySQL
const dtbs = mysql.createConnection({
  host: hostname,
  user: username,
  password: password,
  database: database,
});

module.exports = dtbs;
