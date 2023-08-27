const cekExistPTR = (iniDomainArray) => {
  function containsNumber(str) {
    return /\d/.test(str);
  }
  return new Promise((resolve, reject) => {
    const filesWithNumber = iniDomainArray.filter((filename) => {
      return filename.split(".").some((part) => containsNumber(part));
    });
    const dataAkhirIp = identifikasiIP.akhirIPAddressv4;
    const kecocokanAkhirIp = filesWithNumber.some((filename) => {
      return filename.includes(dataAkhirIp);
    });
    resolve(kecocokanAkhirIp);
  });
};
