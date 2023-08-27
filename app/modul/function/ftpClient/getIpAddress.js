const dns = require("dns");
const getIpAddress = (domain) => {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, (err, addresses, family) => {
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
module.exports = getIpAddress;
