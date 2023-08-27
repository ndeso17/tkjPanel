const path = require("path");
const { exec } = require("child_process");
const addNewPTR = (iniAkhirIPv4, domain) => {
  return new Promise((resolve, reject) => {
    const filePTRSystem = path.join(`/etc/bind/tPanel/db.${iniAkhirIPv4}`);
    const sedNewDomain = `echo "${iniAkhirIPv4}     IN      PTR     ${domain}" | sudo tee -a ${filePTRSystem}`;

    exec(sedNewDomain, async (error, stdout, stderr) => {
      if (error) {
        console.error({
          statusSed: `Terjadi kesalahan saat hendak mengedit file ${filePTRSystem}, Error : ${error}`,
        });
        const dataSed = {
          targetSed: filePTRSystem,
          contentSed: sedNewDomain,
          stdErr: stderr,
          errorMessage: error,
          statusSedPtr: false,
        };
        resolve(dataSed);
      } else {
        console.log({ statusSed: "Sed Successfully!" });
        const dataSed = {
          targetSed: filePTRSystem,
          contentSed: sedNewDomain,
          stdOut: stdout,
          errorMessage: error,
          statusSedPtr: false,
        };
        resolve(dataSed);
      }
    });
  });
};
module.exports = addNewPTR;
