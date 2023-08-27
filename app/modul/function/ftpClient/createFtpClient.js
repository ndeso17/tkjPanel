const fs = require("fs");
const getIpAddress = require("./getIpAddress");
const pushFtpClientData = require("./pushFtpClientData");
const runCommand = require("./runCommand");
const eksekusiCommand = require("./eksekusiCommand");
const createFtpClient = (cekDomain, dataSetup) => {
  return new Promise(async (resolve, reject) => {
    const passwordSudo = dataSetup.passwordSudo;
    const domain = dataSetup.domain;
    const usernameFtp = dataSetup.username;
    const passwordFtp = dataSetup.passwordFtp;
    const cluepwFtp = dataSetup.cluepwFtp;
    const host = `ftp.${domain}`;
    const targetAddRecord = `/etc/bind/tPanel/${cekDomain.domainCocokDengan}`;
    let ipAddressDomain;
    let statusIP;
    const ambilIpAddress = await getIpAddress(domain);
    ipAddressDomain = ambilIpAddress.ipAddressDomain;
    const expectedIpAddressFormat = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!expectedIpAddressFormat.test(ipAddressDomain)) {
      statusIP = false;
    } else {
      statusIP = true;
    }

    if (!cekDomain.kecocokanDomain) {
      const dataInput = {
        dataDomain: cekDomain.kecocokanDomain,
        fileConfDomain: cekDomain.domainCocokDengan,
        status: false,
        pesan: "Eror!",
      };
      resolve(dataInput);
    } else {
      let targetPemeriksaan;
      let containsDomain = false;
      const arrayFileKonfigurasiDomain = cekDomain.fileKonfigurasiDomain;
      const fileCocok = cekDomain.domainCocokDengan;
      if (fileCocok != null) {
        targetPemeriksaan = `/etc/bind/tPanel/${fileCocok}`;
        const data = fs.readFileSync(targetPemeriksaan, "utf8");
        containsDomain = data.includes(domain);
      } else {
        for (const fileKonfigurasi of arrayFileKonfigurasiDomain) {
          targetPemeriksaan = `/etc/bind/tPanel/${fileKonfigurasi}`;
          try {
            const data = fs.readFileSync(targetPemeriksaan, "utf8");
            containsDomain = data.includes(domain);
            if (containsDomain) {
              break;
            }
          } catch (err) {
            console.error("Terjadi kesalahan saat membaca file:", err);
          }
        }
      }
      if (containsDomain) {
        //Init & Run Command
        const rootDirectory = `/home/tkjPanel/${domain}/public_html`;
        const namaGrup = domain.replace(".", "_");
        const addGrup = `if ! getent group ${namaGrup} > /dev/null; then sudo addgroup --badnames ${namaGrup}; fi`;
        const addUser = `sudo useradd --badnames -d ${rootDirectory} -s /bin/bash ${usernameFtp}`;
        // const setPWUser = `echo -e "${passwordFtp}\n${passwordFtp}" | sudo passwd ${usernameFtp}`;
        const setPWUser = `echo "${usernameFtp}:${passwordFtp}" | sudo chpasswd`;
        const addUserToGrup = `sudo usermod -aG ${namaGrup} ${usernameFtp}`;
        const addWwwDataToGrup = `sudo usermod -aG ${namaGrup} www-data`;
        const satuPermissionFolder = `sudo chown ${usernameFtp}:${usernameFtp} ${rootDirectory}`;
        const duaPermissionFolder = `sudo chmod -R g+w,o+w ${rootDirectory}`;
        const restartFtpServer = `sudo systemctl restart vsftpd`;
        //Add record for host
        const dataRecord = `ftp\t14400\tIN\tA\t${ipAddressDomain}`;
        const addRecordHost = `sudo sh -c 'echo "${dataRecord}" >> ${targetAddRecord}'`;
        const restartBind9 = `sudo systemctl restart bind9`;
        //Push Data to database
        const pushData = {
          usernameFtp,
          cluepwFtp,
          rootDirectory,
          host,
        };
        const pushDataToDatabase = await pushFtpClientData(pushData);
        const statusPushData = pushDataToDatabase.status;
        const pesanPushData = pushDataToDatabase.pesan;
        if (!statusIP) {
          const resCallBack = {
            status: false,
            pesan: `Kami gagal mendeteksi domain anda!`,
          };
          resolve(resCallBack);
        } else {
          if (!statusPushData) {
            const resCallBack = {
              status: false,
              pesan: pesanPushData,
            };
            resolve(resCallBack);
          } else {
            // const command = `${addGrup} && ${addUser} && ${setPWUser} && ${addUserToGrup} && ${addWwwDataToGrup} && ${satuPermissionFolder} && ${duaPermissionFolder} && ${addRecordHost} && ${restartBind9} && ${restartFtpServer}`;
            const command = {
              addGrup,
              addUser,
              setPWUser,
              addUserToGrup,
              addWwwDataToGrup,
              satuPermissionFolder,
              duaPermissionFolder,
              restartBind9,
              restartFtpServer,
            };
            const data = fs.readFileSync(targetAddRecord, "utf8");
            const includeDomain = data.includes("ftp");
            if (includeDomain) {
              const eksekusi = runCommand(command, usernameFtp, passwordSudo);
              resolve(eksekusi);
            } else {
              const eksekusi = await eksekusiCommand(
                addRecordHost,
                usernameFtp,
                passwordSudo
              );
              const statusEksekusi = eksekusi.status;
              if (!statusEksekusi) {
                const resCallBack = {
                  status: false,
                  pesan: "Kami gagal menambahkan record untuk host FTP!",
                };
                resolve(resCallBack);
              } else {
                const eksekusi = runCommand(command, usernameFtp, passwordSudo);
                resolve(eksekusi);
              }
            }
          }
        }
      } else {
        const arrayDomain = domain.split(".");
        const subdomain = arrayDomain[0];
        // const subdomain
        const data = fs.readFileSync(targetPemeriksaan, "utf8");
        const mengandungSubdomain = data.includes(subdomain);
        if (!mengandungSubdomain) {
          const dataOke = {
            targetPemeriksaan,
            containsDomain,
            status: false,
            pesan: "Eror!",
          };
          resolve(dataOke);
        } else {
          const arrayDomain = domain.split(".");
          const iniDomain = arrayDomain.slice(1).join(".");
          const rootDirectory = `/home/tkjPanel/${iniDomain}/public_html/${domain}`;
          const namaGrup = arrayDomain.slice(0).join("_");
          const addGrup = `if ! getent group ${namaGrup} > /dev/null; then sudo addgroup ${namaGrup}; fi`;
          const addUser = `sudo useradd --badnames -d ${rootDirectory} -s /bin/bash ${usernameFtp}`;
          const setPWUser = `echo "${usernameFtp}:${passwordFtp}" | sudo chpasswd`;
          const addUserToGrup = `sudo usermod -aG ${namaGrup} ${usernameFtp}`;
          const addWwwDataToGrup = `sudo usermod -aG ${namaGrup} www-data`;
          const satuPermissionFolder = `sudo chown ${usernameFtp}:${usernameFtp} ${rootDirectory}`;
          const duaPermissionFolder = `sudo chmod -R g+w,o+w ${rootDirectory}`;
          const restartFtpServer = `sudo systemctl restart vsftpd`;
          //Add record for host
          const dataRecord = `ftp.${subdomain}\t14400\tIN\tA\t${ipAddressDomain}`;
          const addRecordHost = `sudo sh -c 'echo "${dataRecord}" >> ${targetAddRecord}'`;
          const restartBind9 = `sudo systemctl restart bind9`;
          //Push Data to database
          const pushData = {
            usernameFtp,
            cluepwFtp,
            rootDirectory,
            host,
          };
          const pushDataToDatabase = await pushFtpClientData(pushData);
          const statusPushData = pushDataToDatabase.status;
          const pesanPushData = pushDataToDatabase.pesan;
          if (!statusIP) {
            const resCallBack = {
              status: false,
              pesan: `Kami gagal mendeteksi domain anda!`,
            };
            resolve(resCallBack);
          } else {
            if (!statusPushData) {
              const resCallBack = {
                status: false,
                pesan: pesanPushData,
              };
              resolve(resCallBack);
            } else {
              // const command = `${addGrup} && ${addUser} && ${setPWUser} && ${addUserToGrup} && ${addWwwDataToGrup} && ${satuPermissionFolder} && ${duaPermissionFolder} && ${addRecordHost} && ${restartBind9} && ${restartFtpServer}`;
              const command = {
                addGrup,
                addUser,
                setPWUser,
                addUserToGrup,
                addWwwDataToGrup,
                satuPermissionFolder,
                duaPermissionFolder,
                restartBind9,
                restartFtpServer,
              };
              const data = fs.readFileSync(targetAddRecord, "utf8");
              const includeDomain = data.includes(`ftp.${subdomain}`);
              if (includeDomain) {
                const eksekusi = runCommand(command, usernameFtp, passwordSudo);
                resolve(eksekusi);
              } else {
                const eksekusi = await eksekusiCommand(
                  addRecordHost,
                  usernameFtp,
                  passwordSudo
                );
                const statusEksekusi = eksekusi.status;
                if (!statusEksekusi) {
                  const resCallBack = {
                    status: false,
                    pesan: "Kami gagal menambahkan record untuk host FTP!",
                  };
                  resolve(resCallBack);
                } else {
                  const eksekusi = runCommand(
                    command,
                    usernameFtp,
                    passwordSudo
                  );
                  resolve(eksekusi);
                }
              }
            }
          }
        }
      }
    }
  });
};
module.exports = createFtpClient;
