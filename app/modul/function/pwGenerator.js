const response = require("../view/response");
const bcrypt = require("bcrypt");
const saltRounds = 12;
const pwGenerator = (password, username) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (saltErr, salt) => {
      if (saltErr) {
        console.error("Error generating salt:", saltErr);
        response(
          500,
          saltErr,
          `Eror saat membuat SALT password untuk ${username}`,
          res
        );
        return;
      }
      bcrypt.hash(password, salt, (hashErr, hash) => {
        if (hashErr) {
          console.error("Error hashing password:", hashErr);
          response(
            500,
            hashErr,
            `Eror saat membuat HASH password untuk ${username}`,
            res
          );

          return;
        }
        resolve(hash);
      });
    });
  });
};
module.exports = pwGenerator;
