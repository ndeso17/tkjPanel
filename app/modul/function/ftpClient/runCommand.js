const eksekusiCommand = require("./eksekusiCommand");
const runCommand = (command, usernameFtp, passwordSudo) => {
  return new Promise(async (resolve, reject) => {
    const perintah = command.addGrup;
    const runAddGrup = await eksekusiCommand(
      perintah,
      usernameFtp,
      passwordSudo
    );
    const statusEksekusi = runAddGrup.status;
    if (!statusEksekusi) {
      resolve(runAddGrup);
    } else {
      const perintahAddUser = command.addUser;
      const runPerintahAddUser = await eksekusiCommand(
        perintahAddUser,
        usernameFtp,
        passwordSudo
      );
      const statusEksekusi2 = runPerintahAddUser.status;
      if (!statusEksekusi2) {
        resolve(runPerintahAddUser);
      } else {
        const perintahSetPw = command.setPWUser;
        const runPerintahSetPw = await eksekusiCommand(
          perintahSetPw,
          usernameFtp,
          passwordSudo
        );
        const statusEksekusi3 = runPerintahSetPw.status;
        if (!statusEksekusi3) {
          resolve(runPerintahSetPw);
        } else {
          const perintahAddUserToGrup = command.addUserToGrup;
          const runPerintahAddUserToGrup = await eksekusiCommand(
            perintahAddUserToGrup,
            usernameFtp,
            passwordSudo
          );
          const statusEksekusi4 = runPerintahAddUserToGrup.status;
          if (!statusEksekusi4) {
            resolve(runPerintahAddUserToGrup);
          } else {
            const perintahAddWwwDataToGrup = command.addWwwDataToGrup;
            const runPerintahAddWwwDataToGrup = await eksekusiCommand(
              perintahAddWwwDataToGrup,
              usernameFtp,
              passwordSudo
            );
            const statusEksekusi5 = runPerintahAddWwwDataToGrup.status;
            if (!statusEksekusi5) {
              resolve(runPerintahAddWwwDataToGrup);
            } else {
              const perintahSatuPermissionFolder = command.satuPermissionFolder;
              const runPerintahSatuPermissionFolder = await eksekusiCommand(
                perintahSatuPermissionFolder,
                usernameFtp,
                passwordSudo
              );
              const statusEksekusi6 = runPerintahSatuPermissionFolder.status;
              if (!statusEksekusi6) {
                resolve(runPerintahSatuPermissionFolder);
              } else {
                const perintahDuaPermissionFolder = command.duaPermissionFolder;
                const runPerintahDuaPermissionFolder = await eksekusiCommand(
                  perintahDuaPermissionFolder,
                  usernameFtp,
                  passwordSudo
                );
                const statusEksekusi7 = runPerintahDuaPermissionFolder.status;
                if (!statusEksekusi7) {
                  resolve(runPerintahDuaPermissionFolder);
                } else {
                  const perintahRestartBind9 = command.restartBind9;
                  const runPerintahRestartBind9 = await eksekusiCommand(
                    perintahRestartBind9,
                    usernameFtp,
                    passwordSudo
                  );
                  const statusEksekusi9 = runPerintahRestartBind9.status;
                  if (!statusEksekusi9) {
                    resolve(runPerintahRestartBind9);
                  } else {
                    const perintahRestartFtpServer = command.restartFtpServer;
                    const runPerintahRestartFtpServer = await eksekusiCommand(
                      perintahRestartFtpServer,
                      usernameFtp,
                      passwordSudo
                    );
                    const statusEksekusi10 = runPerintahRestartFtpServer.status;
                    if (!statusEksekusi10) {
                      const resCallBack10 = {
                        status: statusEksekusi10,
                        pesan: "Gagal menjalankan perintah restart FTP Server",
                      };
                      resolve(resCallBack10);
                    } else {
                      resolve(runPerintahRestartFtpServer);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
};
module.exports = runCommand;
