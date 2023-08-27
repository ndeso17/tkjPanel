const ipAddressIdentifier = (ipAddress) => {
  return new Promise((resolve, reject) => {
    const ipAddressArray = ipAddress.split(".");
    const jumlahSubAngka = ipAddressArray.length;
    const iniAkhirIPv4 = ipAddressArray.slice(3).join(".");
    const ipParts = ipAddress.split(".");
    const inAddrArpa = ipParts.slice(0, 3).reverse().join(".");
    const iniIPAddressv4 = {
      jumlahBagianIpAddress: jumlahSubAngka,
      ipAddressDomain: ipAddress,
      akhirIPAddressv4: iniAkhirIPv4,
      ipInAddrArpa: inAddrArpa,
    };
    resolve(iniIPAddressv4);
  });
};
module.exports = ipAddressIdentifier;
