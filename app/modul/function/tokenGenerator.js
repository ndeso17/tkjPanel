require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.APP_SECRET_KEY;
const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    let kadaluarsa;
    if (payload.kelas === "free") {
      kadaluarsa = "1h";
    } else if (payload.kelas === "lisensiB") {
      kadaluarsa = "15d";
    } else if (payload.kelas === "lisensiA") {
      kadaluarsa = "30d";
    } else {
      console.log({ errorInput: "Kelas undefined" });
    }
    const token = jwt.sign(payload, secretKey, { expiresIn: kadaluarsa });
    resolve(token);
  });
};
module.exports = generateToken;
