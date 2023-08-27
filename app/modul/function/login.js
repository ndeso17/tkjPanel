const { spawn } = require("child_process");

const login = (passwordSudo) => {
  let stdOut;
  let stdErr;
  return new Promise((resolve, reject) => {
    const command = `sudo su`;
    const child = spawn("sudo", ["-S", ...command.split(" ")], {
      stdio: "pipe",
    });

    child.stdin.write(`${passwordSudo}\n`);
    child.stdin.end();

    child.stdout.on("data", (data) => {
      stdOut = data;
    });

    child.stderr.on("data", (data) => {
      stdErr = data;
    });

    child.on("close", async (code) => {
      if (code === 0) {
        const pesan = `Root berhasil dibuka!`;
        console.log(pesan);
      } else {
        const pesan = `Root gagal dibuka!`;
        console.log(pesan);
      }
    });

    let dataLogSystem;
    if (stdErr == null) {
      dataLogSystem = {
        message: `Root berhasil dibuka!`,
        statusLogin: true,
        iniStdError: stdErr,
        iniStdOut: stdOut,
      };
    } else {
      dataLogSystem = {
        message: `Root gagal dibuka!`,
        statusLogin: false,
        iniStdError: stdErr,
        iniStdOut: stdOut,
      };
    }
    resolve(dataLogSystem);
  });
};

module.exports = login;
