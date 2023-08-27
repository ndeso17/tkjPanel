const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
const { spawn } = require("child_process");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);

router.post("/", (req, res) => {
  const { passwordSudo, command } = req.body;
  if (passwordSudo != null && command != null) {
    const child = spawn("sudo", ["-S", ...command.split(" ")], {
      stdio: "pipe",
    });
    child.stdin.write(`${passwordSudo}\n`);
    child.stdin.end();

    let pesanGagal = "";
    let pesanSukses = "";
    let dataHasil = "";

    child.stdout.on("data", (data) => {
      dataHasil = data.toString();
    });

    child.stderr.on("data", (data) => {
      pesanGagal += data.toString();
      console.error(`stderr: ${data}`);
    });

    child.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      if (code === 0) {
        const commandArray = command.split(" ");
        const perintah = commandArray.slice(2).join(" ");
        if (perintah === "list --upgradable") {
          const regex = /\b(\w+(-\w+)*)(?=\/)/g;
          const matches = dataHasil.match(regex);

          const packageNames = [];
          for (const match of matches) {
            packageNames.push(match);
          }
          pesanSukses = `Perintah (${perintah.toUpperCase()}) Sukses Dijalankan!`;
          response(
            200,
            { OutputRegex: packageNames, OutputAsli: dataHasil },
            pesanSukses,
            res
          );
        } else {
          pesanSukses = `Perintah (${perintah.toUpperCase()}) Sukses Dijalankan!`;
          response(200, dataHasil, pesanSukses, res);
        }
      } else {
        pesanGagal = `Terjadi kesalahan, Pesan Eror : ${pesanGagal}`;
        response(500, null, pesanGagal, res);
      }
    });
  } else {
    response(401, null, "Password Sudo dan Command null", res);
  }
});

module.exports = router;
