const dns = require("dns");
const getIpAddressFromNS = (ns1) => {
  return new Promise((resolve, reject) => {
    dns.lookup(ns1, (err, addresses, family) => {
      if (err) {
        // reject(err);
        resolve(err);
      } else {
        const ipAddressDomain = addresses;
        const versiIpAddress = family;
        const dataIpFromNS = {
          versiIpAddress,
          ipAddressDomain,
        };
        resolve(dataIpFromNS);
      }
    });
  });
};
module.exports = getIpAddressFromNS;
